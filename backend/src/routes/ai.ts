import { Router, Request, Response } from 'express';
import axios from 'axios';
import OpenAI from "openai"
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const router: Router = Router();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

async function getAIResponse1(text: string, history: { sender: string; text: string }[]): Promise<string | null> {

    const previousMessages = history.map((message) => {
        return { role: message.sender === 'User' ? 'user' : 'assistant', content: message.text } as { role: 'user' | 'assistant'; content: string };
    }).slice(-5); // Limit to the last 5 messages

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: 'system', content: 'You are an expert in operations management. Provided responses need to be precise, fact-based, and detailed focused on optimizing process efficiency and quality management.' },
            ...previousMessages,
            { role: 'user', content: text }
        ],
        temperature: 0.0,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        max_tokens: 500
    });
    console.log(response.choices[0].message.content);
    const aiMessage = response.choices[0].message.content;
    return aiMessage;
}

async function getAIResponse2(text: string, history: { sender: string; text: string }[]): Promise<string | null> {

    const previousMessages = history.map((message) => {
        return { role: message.sender === 'User' ? 'user' : 'assistant', content: message.text } as { role: 'user' | 'assistant'; content: string };
    }).slice(-5); // Limit to the last 5 messages

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: 'system', content: 'You are a highly knowledgeable operations management specialist. Provide an accurate and well-structured response with a focus on process optimization and quality control. Keep your output clear and concise.' },
            ...previousMessages,
            { role: 'user', content: text }
        ],
        temperature: 0.1,
        top_p: 0.95,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        max_tokens: 500
    });
    console.log(response.choices[0].message.content);
    const aiMessage = response.choices[0].message.content;
    return aiMessage;
}

async function getAIResponse3(text: string, history: { sender: string; text: string }[]): Promise<string | null> {

    const previousMessages = history.map((message) => {
        return { role: message.sender === 'User' ? 'user' : 'assistant', content: message.text } as { role: 'user' | 'assistant'; content: string };
    }).slice(-5); // Limit to the last 5 messages

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: 'system', content: 'You are an experienced operations management advisor. Offer creative, innovative, and insightful suggestions on optimizing operations, balancing quality with efficiency. Feel free to explore new ideas and perspectives.' },
            ...previousMessages,
            { role: 'user', content: text }
        ],
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        max_tokens: 500
    });
    console.log(response.choices[0].message.content);
    const aiMessage = response.choices[0].message.content;
    return aiMessage;
}

router.post('/call', async (req: Request, res: Response) => {
    const text = req.body.text;
    const history = req.body.history;
    let aiMessage: string | null = 'no response';
    let aiVersion = 1; // Default to version 1

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

    // Call the AI model
    try {
        aiMessage = await getAIResponse1(text, history);
        aiVersion = 1;
        console.log('AI Message:', aiMessage);
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ response: 'An error occurred. Please try again.' });
        return;
    }

    //log ai response
    const aiLogEntry = `${new Date().toISOString()} - Version: ${aiVersion} - AI : ${aiMessage}\n`;
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