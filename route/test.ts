import { Router, Request, Response } from "express";

const router = Router();

router.get('/test', (req: Request, res: Response) => {
    res.json({message: "Test route is working!"});  
})

export default router;