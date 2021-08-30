import {Application} from './app';

async function bootstrap(){
    const application = new Application();
    await application.init();
    application.start();

}

bootstrap();