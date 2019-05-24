module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    'extends': 'airbnb',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
    ],
    'rules': {
        'indent': [//验证代码每一行缩进,4个空格
            'warn',
            4
        ],
        'guard-for-in': 'off',//禁止for-in 已修改，循环对象时要用（虽然性能很差）
        'no-restricted-syntax': 'off',//禁止某些javascript语法，可配置
        'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],//强制执行Stroustrup风格 允许一个块打开和关闭括号在同一行上  webpack.config.js中--fix可自动修复
        'react/jsx-indent':[//验证JSX中的缩进,4个空格
            'error',
            4
        ],
        'react/jsx-indent-props':[//验证JSX中的props缩进,4个空格
            'error',
            4
        ],
        'linebreak-style': 'off',//["error", "windows"],换行风格"unix"（默认）强制使用Unix行结尾：\n对于LF。"windows"强制使用Windows行结束符：\r\n用于CRLF。
        'quotes': [// 语句强制单引号
            'error',
            'single'
        ],
        'semi': [// 语句强制分号结尾
            'error',
            'always'
        ],
        'react/prefer-stateless-function': 'off',//强制将类声明为一个纯函数
        'jsx-ally/anchor-is-valid':[// 在组件中不能使用a标签，跳转页面或者跳转锚点时只能用Button或js  //已修改
            'off',
            {
              components: ['Link'],
              specialLink: ['to'],
              aspects: ['noHref', 'invalidHref', 'preferButton']
            }
          ], 
        'jsx-a11y/click-events-have-key-events': 'off',//点击事件必须伴有键盘事件
        'jsx-a11y/no-static-element-interactions': 'off',//每一个非表单的元素必须有一个表单元素的标识
        'no-const-assign':'error',//已修改 禁止修改const声明的变量
        'no-use-before-define':'off',//已修改 改成warn或off符合自己代码习惯
        'no-plusplus':'off',//已修改 //禁止使用++、--
        'no-unused-expressions':'error',//已修改 //禁止无用的表达式
        'no-mixed-operators':'off',//已修改 禁止使用混合运算符（逻辑或数学运算符）
        'no-param-reassign':'error',//禁止给参数重新赋值
        "max-len":["off", { "code": 200 }], //某行最大的列数 可配置 自相矛盾
        'react/jsx-no-undef':'error',//已修改//禁止使用undefined的变量
        'no-mixed-spaces-and-tabs':'error',//已修改 禁止使用混合的tab和spaces
        'no-console': 'warn',//待修改 禁止console
        'no-unused-vars':'off',//不能有声明后未被使用的变量或参数 已修改,自相矛盾
        'react/jsx-uses-vars': 'error',// 使用var声明
        'class-methods-use-this': 'off',//保持 使用this
        'prefer-destructuring': ['off'],//已修改 //强制使用数组/对象解构
        'react/destructuring-assignment': ['error'],//已修改，使用解构赋值的形式
        'react/jsx-no-bind': ['error'],//禁止使用bind(this)方法 
        'react/no-unused-state': ['error'],//修改 不使用无用的state
        'no-nested-ternary': 'error',//禁止使用嵌套的三目运算 :嵌套三元表达式会使代码更难理解。
        'react/prop-types': 'off',//使用propTypes暴露 props里的属性  已修改
        'eqeqeq': 'error',//使用全等 已修改
        'camelcase': 'error',//强制驼峰法命名
        'react/sort-comp': 'off',//已修改  函数排序  没必要固定函数顺序
        'jsx-a11y/alt-text': 'error',//已修改 强制所有的alt解释属性。
        'no-tabs': 'error',//已修改使用数组索引是一个坏主意，因为它不能唯一地标识您的元素。如果对数组进行排序或将元素添加到数组的开头，则即使表示该索引的元素可能相同，也会更改索引。这会导致不必要的渲染。
        'react/no-array-index-key': 'error',//Eslint-plugin-react
        'no-useless-concat': 'error',//禁止无用的concat连接
        'no-shadow':'error'// 禁止在内部重复声明全局变量
    }
};
// eslint内置规则文档：https://eslint.org/docs/rules/
// https://www.npmjs.com/package/eslint-config-airbnb
// airbnb规则文档：https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
