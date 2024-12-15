import express from 'express';
import loginRoutes from './routes/login.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import consultaRoutes from './routes/consultas.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());


// Habilita CORS
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowedHeaders: ['Content-Type', 'Authorization']
        
    }

));

app.use('/api/usuarios', loginRoutes);

//////////////////
app.use('/api/consulta', consultaRoutes);
/////////////

export default app;