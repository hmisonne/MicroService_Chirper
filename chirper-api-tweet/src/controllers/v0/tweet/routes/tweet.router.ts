import {Router, Request, Response} from 'express';
import {TweetItems} from '../models/TweetItems';
import {CommentItems} from '../models/CommentItems'
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import Axios from 'axios'

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


// Fetch all tweet
router.get('/',
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const tweets = await TweetItems.findAll();
      res.send({success: true, tweets});
    });

// Fetch tweet by id
router.get('/:id',
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const tweet = await TweetItems.findOne({
        where: { id },
        include: [CommentItems],
    });
      res.send({success: true, tweet});
    });


// Create tweet
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
      const {text, author, replyingTo} = req.body

      if (!text) {
        return res.status(400).send({message: 'Text is required or malformed.'});
      }

      if (!author) {
        return res.status(400).send({message: 'Author is required.'});
      }

      const item = await new TweetItems({
        text,
        author
      });

      const tweet = await item.save();

      res.status(201).send({success: true, tweet});
    });

// Create feed with metadata
router.patch('/:id',
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const {text} = req.body

      if (!text) {
        return res.status(400).send({message: 'Text is required or malformed.'});
      }

      const curr_tweet = await TweetItems.findByPk(id);
      curr_tweet.text = text

      const tweet = await curr_tweet.save();

      res.status(201).send({success: true, tweet});
    });

router.delete('/:id',
  async (req: Request, res: Response) => {
    const {id} = req.params;

    const curr_tweet = await TweetItems.findByPk(id);

    await curr_tweet.destroy();

    res.status(201).send({success: true});
  });

// Create a comment in response to a tweet
router.post('/:id/comment',
    async (req: Request, res: Response) => {
      const {text, author} = req.body
      const {id} = req.params;

      if (!text) {
        return res.status(400).send({message: 'Text is required or malformed.'});
      }

      if (!author) {
        return res.status(400).send({message: 'Author is required.'});
      }

      const item = await new CommentItems({
        text,
        author,
        tweetId: id
      });

      const comment = await item.save();

      res.status(201).send({success: true, comment});
    });


export const TweetRouter: Router = router;
