/**
 *     Import NodeJS modules
 */
import * as path from 'path';

/**
 *     Import custom types and modules
 */
import { WebServerSing } from './src/web-server';
import { webServerConfig } from './config';


/**
 *     Create and run the web-server
 */
WebServerSing.create(webServerConfig);

