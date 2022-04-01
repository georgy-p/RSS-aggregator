import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve('./', 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),

    ],
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
        ],
      },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
