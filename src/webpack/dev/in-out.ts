/**
 *        Importing third-party modules
 */
import * as webpack from 'webpack';

/**
 *        Defining input-output class
 */
class InputOutputs{
    public entry: webpack.Entry;
    public output: webpack.Output;
    constructor (inputPath: string, outputPath: string, publicOutputPath: string){
        this.entry = {
            'app': inputPath
        };
        this.output = {
            path: outputPath,
            publicPath: publicOutputPath,
            filename: 'bundle.js'
            //chunkFilename: '[id].chunk.js'
        }
    }
}

/**
 *        Exporting statement
 */
export { InputOutputs }