interface IDBServerConfig{
    serverName: string;
    portNumber: number;
    databaseName: string;
    collectionName: string;
}
interface ICursorFECallback{
    (doc: object): void;
}

export {
    IDBServerConfig,
    ICursorFECallback
}