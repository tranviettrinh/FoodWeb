import { BaseRouter } from "./BaseRouter";

class TestRouter extends BaseRouter{
    constructor(){
        super();
        this.init();
    }
    protected init(){
        this.router.get('/test',(req,res,next)=>{
            res.status(200).json({message:'Ha Ha Ha'})
        });
    }
}

export = new TestRouter().router;
