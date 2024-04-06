module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  overrides: [
    // Temporary overrides
    {
      files: ['dev/**/*.ts'],
      rules: {
        'import/no-relative-packages': 'off',
        'no-process-env': 'off',
      },
    },
  ],
  excludes: ['dev/plugin.spec.ts'],
}
