module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-undef": [0],
        "no-console": [0],
        'indent': 'off',
        // 4代表4个空格 1代表1倍缩进
        // 'vue/script-indent': ['error', 4, { 'baseIndent': 1 }],
        // 配置html 注意html没有第三个参数
        'vue/html-indent': ['error', 4, { 'baseIndent': 1 }]
    }
};