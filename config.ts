/**
 *     Import NodeJS modules
 */
import * as path from 'path';
import * as express from 'express';
import { IWebServerConfig } from './_interfaces/web-server';
import { IDBServerConfig } from './_interfaces/database'; 

/**
 *     Server configuration
 */
const webServerConfig: IWebServerConfig = {
    portNumber: 16080,
    viewsPath: path.resolve(__dirname,'./views/'),
    publicPath: path.resolve(__dirname,'./_public/')
}
class DBServerConfig implements IDBServerConfig{
    public serverName: string = 'localhost';
    public portNumber: number  = 27017;
    public databaseName: string;
    public collectionName: string;
    public constructor(databaseName: string = 'testDb', collectionName: string = 'testCollection'){
        this.databaseName = databaseName;
        this.collectionName = collectionName;
    }    
}

/**
 *     Export statement
 */
export{     
    webServerConfig,
    DBServerConfig
}