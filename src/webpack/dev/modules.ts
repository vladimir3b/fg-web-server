/**
 *        Importing third-party modules
 */
import * as webpack from 'webpack';
import * as path from 'path';

/**
 *        Declaring webpack modules
 */
const webpackModule: webpack.Module = {
    rules: [
        {
            test: /\.html$/,
            use: [{ loader: 'html-loader' }]
        },
        {
            test: /\.css$/,
            use: [{ loader: 'raw-loader' }]
        },
        {
            test: /\.ts$/,
            use: [
                {
                    loader: 'ts-loader', options: {
                        transpileOnly: true,
                        configFile: `${path.resolve(__dirname, '../tsconfig.json')}`
                    }
                },
                { loader: 'angular2-template-loader' },
                { loader: 'angular-router-loader' }
            ]
        }
    ],
    exprContextCritical: false
}

/**
 *        Exporting statement
 */
export { webpackModule }