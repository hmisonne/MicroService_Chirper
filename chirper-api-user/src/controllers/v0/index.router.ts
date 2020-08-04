import {Router, Request, Response} from 'express';
import {TweetRouter} from './tweet/routes/tweet.router';

const router: Router = Router();

router.use('/tweet', TweetRouter);

router.get('/', async (req: Request, res: Response) => {
  res.send(`V0`);
});

export const IndexRouter: Router = router;
