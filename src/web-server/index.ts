/**
 *     Import NodeJS modules
 */
import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as handlebars from "express-handlebars";

/**
 *     Import custom types and modules
 */
import { Router } from './routes';
import { IWebServerConfig } from '../../_interfaces/web-server';

/**
 *     Main Class Definition as a singleton
 */
class WebServerSing{
    /**
     *     Properties of the class
     */
    private app: express.Application;
    public static application: any;
    private publicPath: string;
    private viewsPath: string;
    private server: http.Server;
    private routes: express.Router;

    /**
     *     Definition for singleton
     */
    private static instance: WebServerSing;
    private constructor(portNumber: number, publicPath: string, viewsPath: string){
        this.app = express();       
        this.publicPath = publicPath;
        this.viewsPath = viewsPath;
        this.routes = Router.createRoutes();
        this.app.set('port', portNumber);
    }
    public static create(webServerConfig: IWebServerConfig): http.Server{
        if (!WebServerSing.instance){
            WebServerSing.instance = new WebServerSing(webServerConfig.portNumber, webServerConfig.publicPath, webServerConfig.viewsPath);
            WebServerSing.instance.start();
        }
        return WebServerSing.instance.server;
    }

    /**
     *     Methods of the class
     */
    private start(): void{
        console.log('\x1Bc');//clears the console
        this.app.use(logger('dev'));
        
        //declare static folder - public folder
        this.app.use('/', express.static(this.publicPath));
        
        //create favicon
        this.app.use(favicon(path.resolve(this.publicPath,'favicon.ico')));

        //declare the view engine - handlebar
        this.app.engine('hbs', handlebars({ //The first argument 'hbs' will determine the extension of index file in render statement - res.render('index', (req, res)=>{...})
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: path.resolve(this.viewsPath, 'layouts')
        }));
        this.app.set('views', this.viewsPath);       
        this.app.set('view engine', 'hbs'); //The second argument 'hbs' MUST be the same as the first argument of app.engine statement


        //load all the routes
        this.app.use('/', this.routes);
      
        // here I treat error 404 - redirect to angular app
        this.app.use((req:express.Request, res:express.Response, next:express.NextFunction)=>{
            res.render('index', { 
                mainHeader :  "My Study on MongoDB with NodeJS and Typescript",
                pageTitle:  "FG Phone Book"
            });         
        });
       

        //create the server
        this.server = http.createServer(this.app);
        this.server
            .listen(this.app.get('port'))
            .on('listening', () : void => console.log(`Server is listening on port ${this.app.get('port')}...`))
            .on('error', (error: NodeJS.ErrnoException): void => {        
                if (error.syscall!=='listen') {
                    throw error;
                }
                switch (error.code) {
                    case 'EACCES': {
                        console.error(`Error: Port ${this.app.get('port')}  requires elevated privileges...`);
                        process.exit(0);
                        break;
                    }
                    case 'EADDRINUSE': {
                        console.error(`Error: Port ${this.app.get('port')} is already in use...`);
                        process.exit(0);
                        break;
                    }
                    default:{
                        throw error;
                    }                    
                }             
            });           
    }
}

/**
 *     Export statement
 */
export { 
    WebServerSing 
}