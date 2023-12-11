import {Router, Request, Response, NextFunction} from 'express';
import {IUser, userModule} from '../models/user';
import {UserError} from '../Errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  try {
    const user = await userModule.findOne({username});
    if (user) {
      return res.status(400).json({type: UserError.NO_USER_FOUND});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModule({username, password: hashedPassword});
    await newUser.save();

    res.json({message: 'successfully saved new data'});
  } catch (error) {
    res.status(500).json({type: 'catch error'});
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const {username, password} = req.body;
  try {
    const user = await userModule.findOne({username});
    if (!user) {
      return res.status(400).json({type: UserError.NO_USER_FOUND});
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({type: UserError.WRONG_CREDENTIALS});
    }
    const token = jwt.sign({id: user.id}, 'secret');
    res.json({token, userID: user.id});
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({type: 'catch error'});
  }
});

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, 'secret', err => {
      if (err) {
        return res.sendStatus(403);
      }
      return res.sendStatus(401);
    });
  } else {
  }
};

export {router as userRouter};
