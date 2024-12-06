import express from 'express';
import loginRoutes from './routes/login.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


// Habilita CORS
app.use(cors(
    {
        origin: 'http://localhost:5173',
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowedHeaders: ['Content-Type', 'Authorization']
        
    }

));

app.use('/api/usuarios', loginRoutes);

export default app;