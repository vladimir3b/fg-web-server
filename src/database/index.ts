/**
 *     Import NodeJS modules
 */
import { MongoClient, MongoError, Db, Collection, Cursor } from 'mongodb';
import * as assert from 'assert';

/**
 *     Import custom types and modules
 */
import { IDBServerConfig, ICursorFECallback } from '../../_interfaces/database';

/**
 *     Main Class Definition
 */
class MongoDB{
    /**
     *     Properties of the class
     */
    public dbConfigObject: IDBServerConfig;

    /**
     *     Methods of the class
     */
    public constructor(dbConfigObject: IDBServerConfig){
        this.dbConfigObject = dbConfigObject;
    }
    private dbURL(): string{
        return `mongodb://${this.dbConfigObject.serverName}:${this.dbConfigObject.portNumber}/${this.dbConfigObject.databaseName}`;
    }
    public async addData(record: Array<object>): Promise<void>{
        let db: Db = await MongoClient.connect(this.dbURL());
        db.collection(this.dbConfigObject.collectionName).insertMany(record)
            .catch((error: MongoError)=>{ throw error; })
            .then(()=>{db.close()});
    }
    public async read(

        queryObject: object = {}, 
        projectionObject: object  = {}, 
        pageSize: number, 
        pageNumber: number, 
        callback: ICursorFECallback = (document: {}) => console.log(document), 
        onCursorExhausted: Function ): Promise<void>{

        let skips = pageSize * (pageNumber - 1);
        let db: Db = await MongoClient.connect(this.dbURL());
        let cursor: Cursor = db.collection(this.dbConfigObject.collectionName).find(queryObject).skip(skips).limit(pageSize);
        cursor
            .project(projectionObject)
            .forEach((document: object) => callback(document), () => { db.close(); onCursorExhausted() });        
    }

    public async numberOfDocuments(): Promise<number>{
        let db: Db = await MongoClient.connect(this.dbURL());
        //let countNumberOfDocuments: number = db.collection(this.dbConfigObject.collectionName).find({}).count();
        return new Promise<number>((resolve: any, reject: any) => {
            let numberOfDocuments = db.collection(this.dbConfigObject.collectionName).find({}).count();
            resolve(numberOfDocuments);
        });

    }
}

/**
 *     Export statement
 */
export { 
    MongoDB
}