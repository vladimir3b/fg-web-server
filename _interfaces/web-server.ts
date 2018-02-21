import * as express from 'express';

interface IWebServerConfig{
    portNumber: number;
    publicPath: string;
    viewsPath: string;
}
interface ICreateServer{
    (request: express.Request, response: express.Response): void;
}

export{
    IWebServerConfig,
    ICreateServer
}