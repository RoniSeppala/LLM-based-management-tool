import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/call', async (req: Request, res: Response) => {
    const { text } = req.body;
    const response = `Response for: "${text}"`;
    res.json({ response });
});

export default router;