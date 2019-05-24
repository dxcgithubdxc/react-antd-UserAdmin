const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//  const AntdScssThemePlugin = require('antd-scss-theme-plugin');
// ExtractTextWebpackPlugin

const config = {
    entry: {
        index: './index.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    watch: true,
    devServer: {
        clientLogLevel: 'error',
        contentBase: path.resolve(__dirname, 'dist/'),
        inline: true,
        hotOnly: true,
        historyApiFallback: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        port: 8080,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2,
                },
            },
        },
    },
    module: {
        // 兼容jsx
        rules: [
            // babel-loader的文档：https://github.com/babel/babel-loader
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: 'babel-cache',
                },
            },
            {
                test: /\.js|.jsx$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                options: { // 这里的配置项参数将会被传递到 eslint 的引擎
//                  formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                    fix: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
                include: [path.resolve(__dirname, 'src')], // 样式只应用到这个文件夹下面的css文件中
            },
            // 下面的less-loader是为了支持antd
            // less-loader的文档： https://www.npmjs.com/package/less-loader
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        modifyVars: { // 主体颜色
                            'primary-color': '#40a9ff',
                            'link-color': '##40a9ff',
                            'border-radius-base': '4px',
                            'font-size-base': '12px',
                            'line-height-base': '1.2',
                        },
                        javascriptEnabled: true,
                    },
                }],
            },
            {
                test: /\.(png|jpg|jpng|eot|ttf)$/,
                loader: 'url-loader?limit=8192&name=src/images/[name].[ext]',
            },
        ],
    },
    plugins: [
        // new AntdScssThemePlugin('./theme.scss'),
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: '杭州',
            template: 'index.html',
            inject: true,
            chunks: ['index'],
        }),
        new ManifestPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // https://www.npmjs.com/package/webpack-bundle-analyzer
        //    new BundleAnalyzerPlugin({
        //      analyzerMode: 'static',
        //      generateStatsFile: true
        //    }),
    ],
};

module.exports = config;
