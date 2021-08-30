import {Server} from './server';
import { mongoService } from './services/MongoService';
import morgan from 'morgan';
import allRoutes from 'express-list-endpoints';
import cors from 'cors';
import express from 'express';
import path from 'path';

export class Application{
    server : Server;
    init(){
        this.initServer();
        this.initDatabase();
    }
    
    start(){
        ((port = process.env.APP_PORT||5000)=>{
            this.server.app.listen(port,()=>{
                console.log(`Server listening on port ${port}`)
            });
            this.server.app.use(morgan('dev'));
            this.server.app.use(cors());
            this.server.app.use('/images',express.static(path.join(__dirname,'../src/images')));
            this.server.app.use('/api',this.server.router);
            console.log(allRoutes(this.server.app));
        })();
    }

    private initServer(){
        this.server = new Server;
    }

    private initDatabase(){
        mongoService.connect();
    }
};
