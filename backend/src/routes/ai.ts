import { Router, Request, Response } from 'express';
import axios from 'axios';
import OpenAI from "openai"
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const router: Router = Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

router.post('/call', async (req: Request, res: Response) => {
    const text = req.body.text;
    const history = req.body.history;
    let aiMessage: string | null = 'no response';

    console.log(req.body.text);
    console.log(req.body.history);

    //check if log file exists
    const filePath = 'logs/conversation.log';

    if (fs.existsSync(filePath)) {
        console.log('File exists.');
    } else {
        console.log('File does not exist.');
        // Optionally, create the file
        fs.writeFileSync(filePath, '', 'utf8');
    }

    //log request text
    const userLogEntry = `${new Date().toISOString()} - User: ${req.body.text}\n`;
    fs.appendFile(filePath, userLogEntry, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('Log entry added');
        }
    });

    const previousMessages = history.map((message: { sender: string; text: string }) => {
        return { role: message.sender === 'User' ? 'user' : 'assistant', content: message.text };
    }).slice(-5); // Limit to the last 5 messages

    // Call the AI model
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: 'system', content: 'You are an expert operations management assistant. Provide detailed and actionable insights on process optimization, supply chain management, and resource allocation.' },
                ...previousMessages,
                { role: 'user', content: text }
            ]
        });
        console.log(response.choices[0].message.content);
        aiMessage = response.choices[0].message.content;
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ response: 'An error occurred. Please try again.' });
        return;
    }

    //log ai response
    const aiLogEntry = `${new Date().toISOString()} - AI : ${aiMessage}\n`;
    fs.appendFile(filePath, aiLogEntry, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('Log entry added');
        }
    });

    const response = `Response for: "${text} from backend"`;
    res.json({ response, aiMessage });
});

export default router;