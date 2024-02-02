module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      // Colors for Color Palette
      colors: {
        'main-background-color': '#CAFCF6',
        'main-text-color': '#163325',
      },
    },
  },
  plugins: [require('tailwindcss-3d'), require('tailwindcss-animate')],
};
