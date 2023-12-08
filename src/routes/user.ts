import {Router, Request, Response} from 'express';
import {userModule} from '../models/user';
import {UserError} from '../Errors';
import bcrypt from 'bcrypt';

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

export {router as userRouter};
