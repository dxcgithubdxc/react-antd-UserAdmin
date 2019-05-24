const presets = [
    ["@babel/preset-env",
        {
            targets: {
                // https://babeljs.io/docs/plugins/preset-env/
                // https://github.com/ai/browserslist#queries
                // Which browsers are selected: ./node_modules/.bin/browserslist 'chrome >= 65, safari >= 11, firefox >= 58'
                browsers: ["chrome >= 65"]
            },
            useBuiltIns: "usage"
        }
    ],

    ["@babel/preset-react", {
        useBuiltIns: true
    }]
];

const plugins = [
    ["@babel/plugin-proposal-class-properties", {
        "loose": false
    }],
    ["@babel/plugin-syntax-import-meta"],
    
    // 以下是为了支持antd的按需加载
    // https://github.com/ant-design/babel-plugin-import#usage
    // https://ant.design/docs/react/getting-started-cn#按需加载
    ["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": true }, "ant"],

]

module.exports = {
    presets,
    plugins
};
