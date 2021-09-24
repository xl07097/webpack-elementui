module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ["eslint:recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: ["vue"],
    rules: {
        "no-undef": [0],
        "no-console": [0],
        indent: "off",
        "no-unused-vars": "off"
    }
};
