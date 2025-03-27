import { Router, Request, Response } from 'express';
import axios from 'axios';

const router: Router = Router();

router.post('/call', async (req: Request, res: Response) => {
    const text = req.body.text;
    console.log(req.body.text);

    // Call the AI model
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: text },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ response: 'An error occurred. Please try again.' });
        return;
        
    }

    const response = `Response for: "${text} from backend"`;
    res.json({ response });
});

export default router;