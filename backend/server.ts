import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import aiRouter from './src/routes/ai';

dotenv.config();

const app: Express = express();
const port: number =  parseInt(process.env.BACKENDPORT as string) || 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/ai', aiRouter);

if (process.env.NODE_ENV === 'development') {
    const frontEndPort: string = process.env.FRONTENDPORT as string || "3000"
    const corsOptions: CorsOptions = {
        origin: `http://localhost:${frontEndPort}`,
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));
} else {
    const corsOptions: CorsOptions = {
        origin: 'https://yourwebsite.com',
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions));
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});