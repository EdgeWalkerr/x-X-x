module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.jsx',
      './src/**/*.js',
      './src/**/*.tsx',
      './src/**/*.ts',
      './public/index.html',
    ],
    css: ['./src/tailwind.css'],
    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
