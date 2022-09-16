module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    APP_CONFIG: true
  },  
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
    'indent': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'vue/no-unused-components': 0,
    'vue/multi-word-component-names': 0,
    'vue/max-attributes-per-line': 0
  },
}
