import { Router, Request, Response } from 'express'

const router = Router()

router.post('./register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // const user = await  
})

export { router as userRouter };