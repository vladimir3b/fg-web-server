/**
 *        Importing third-party modules
 */
import * as webpack from 'webpack';
import * as path from 'path';

/**
 *         Declaring webpack generator
 */
class webpackGenerate implements webpack.Configuration{
    public constructor(
        public devtool: webpack.Options.Devtool,
        public entry: webpack.Entry,
        public module: webpack.Module,
        public resolve: webpack.Resolve,
        public output: webpack.Output
    ){};
}

/**
 *        Exporting statement
 */
export { webpackGenerate };