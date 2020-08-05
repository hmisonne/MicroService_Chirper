import {Router, Request, Response} from 'express';
import {UserItems} from '../models/UserItems';
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import Axios from 'axios'
import { decode } from 'jsonwebtoken'

const router: Router = Router();
const jwksUrl = 'https://fsnd-hm.auth0.com/.well-known/jwks.json'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  try {
    const token = await verifyToken(req.headers.authorization)
    return next();
  } catch(e) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
  }
}

function getToken(authHeader: any) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
      throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}

async function verifyToken(authHeader: any) {
  const token = getToken(authHeader)
  let cert;
  try {
      const response = await Axios.get(jwksUrl);
      const pemData = response['data']['keys'][0]['x5c'][0];
      cert = `-----BEGIN CERTIFICATE-----\n${pemData}\n-----END CERTIFICATE-----`;
  } catch (err) {
      console.log(err);
  }
  return jwt.verify(token, cert, { algorithms: ['RS256'] })
}

function parseUserId(jwtToken: string): string {
  const decodedJwt = decode(jwtToken)
  return decodedJwt.sub
}

// Fetch all users
router.get('/',
    async (req: Request, res: Response) => {
      const users = await UserItems.findAll();
      res.send({success: true, users});
    });

// Fetch user by userId using Auth Headers
router.get('/user',
    async (req: Request, res: Response) => {
      const authorization = req.headers.authorization
      const split = authorization.split(' ')
      const jwtToken = split[1]
      const userId = parseUserId(jwtToken)

      const user = await UserItems.findOne({
        where: { userId }
    });
      res.send({success: true, user});
    });


// Create user
router.post('/',
    // requireAuth,
    async (req: Request, res: Response) => {
      const {userId, name, avatarURL} = req.body

      if (!userId) {
        return res.status(400).send({message: 'id is required or malformed.'});
      }

      if (!name) {
        return res.status(400).send({message: 'name is required.'});
      }

      const item = await new UserItems({
        userId,
        name,
        avatarURL
      });

      const user = await item.save();

      res.status(201).send({success: true, user});
    });


export const UserRouter: Router = router;
