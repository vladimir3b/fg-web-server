/**
 *        Importing third-party modules
 */
import * as webpack from 'webpack';
import * as path from 'path';

/**
 *         Importing custom modules
 */
import { webServerConfig } from './config';
import { webpackGenerate } from './src/webpack/index';
import { webpackModule } from './src/webpack/dev/modules';
import { InputOutputs } from './src/webpack/dev/in-out';
import { devtool, resolve} from './src/webpack/dev/other-parameters';

/**
 *        Declaring constants
 */
const inputPath: string = './src/front-end/index.ts';
const outputPath: string = path.resolve(webServerConfig.publicPath, './javascript');
const publicOutputPath: string = '/javascript';
const inputOutputs = new InputOutputs(inputPath, outputPath, publicOutputPath);
const webpackObj: webpack.Configuration = new webpackGenerate(
    devtool, 
    inputOutputs.entry, 
    webpackModule, 
    resolve, 
    inputOutputs.output
);

/**
 *        Exporting statement
 */
export default webpackObj;
