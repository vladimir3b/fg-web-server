/**
 *     Import NodeJS modules
 */
import * as express from 'express';
import { MongoError } from 'mongodb';


/**
 *     Import custom modules
 */
import { MongoDB } from '../../database';
import { DBServerConfig } from '../../../config';



/**
 *     Main Class Definition
 */
class Router{
    /**
     *     Properties of the class
     */
    public static router: express.Router;

    /**
     *     Methods of the class
     */
    public static createRoutes(): express.Router{
        Router.router = express.Router();
        Router.getRoutes();
        return Router.router;
    }
    private static getRoutes(){
        this.router.get('/', (req: express.Request, res: express.Response) => {
            res.render('index', { 
                mainHeader :  "My Study on MongoDB with NodeJS and Typescript",
                pageTitle:  "FG Phone Book"
            });
        });     
        this.router.get('/api/db/general', (req: express.Request, res: express.Response): void => {  
            const mongoDB: MongoDB = new MongoDB(new DBServerConfig('fgPhoneMag', 'invoices'));            
            mongoDB.numberOfDocuments().then((val: number) => { 
                res.json({numberOfDocuments: val});
            });
        });        
        this.router.get('/api/db/:size/:page', (req: express.Request, res: express.Response): void => {  
            const mongoDB: MongoDB = new MongoDB(new DBServerConfig('fgPhoneMag', 'invoices'));
            let persons: Array<object> = [];
            let pageSize: number = +req.params['size'];
            let pageNumber: number = +req.params['page'];
            mongoDB
                .read({}, {}, pageSize, pageNumber, (person: object) => persons.push(person), () => res.json(persons))
                .catch((error: MongoError) => console.info(error.message))            
        });
    }
}

/**
 *     Export statement
 */
export { Router }