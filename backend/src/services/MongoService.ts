import mongoose from 'mongoose';

const mongoSetup = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
    useFindAndModify: false,
};

export class MongoService{
    constructor(private readonly uri:string, private readonly config){

    }
    async connect(){
        try {
            await mongoose.connect(this.uri,this.config);
            console.log('Connect database successfully!');
        } catch (error) {
            throw new Error(error);
        }
    }
}

const uri = process.env.MONGO_URI;
export const mongoService = new MongoService(uri, mongoSetup);