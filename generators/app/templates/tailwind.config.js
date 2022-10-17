module.exports = {
  content: [
    './src/views/**/*.hbs',
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};
