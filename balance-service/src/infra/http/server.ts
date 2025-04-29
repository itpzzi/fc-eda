import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function startServer() {
    const app = express();
    app.use(express.json());

    // app.get('/health', (_req, res) => res.send('OK'));

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
        console.log(`HTTP server running on port ${port}`);
    });
}
