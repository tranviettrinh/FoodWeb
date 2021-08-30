import express from 'express';
import dotenv from 'dotenv';
import masterRouter from './routes/MasterRouter';

dotenv.config({
    path:'.env'
})

export class Server{
    public app = express();
    public router = masterRouter;
    
}