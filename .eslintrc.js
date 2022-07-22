module.exports = {
    extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error'
    }
};
