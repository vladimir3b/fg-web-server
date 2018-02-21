/**
 *        Importing third-party modules
 */
import * as webpack from 'webpack';

/**
 *         Declaring parameters
 */
const devtool: webpack.Options.Devtool = 'cheap-module-eval-source-map';
const resolve: webpack.Resolve = { extensions: ['.js', '.ts'] };

/**
 *        Exporting statement
 */
export{
    devtool,
    resolve
}