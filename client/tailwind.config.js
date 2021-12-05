const theme = require('tailwindcss/defaultTheme');

module.exports = {
      purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
      darkMode: false, // or 'media' or 'class'
      theme: {
            colors: {
                  ...theme.colors,
                  'dodger-blue': {
                        DEFAULT: '#4E69FF',
                        50: '#FFFFFF',
                        100: '#F1F3FF',
                        200: '#C8D1FF',
                        300: '#A0AEFF',
                        400: '#778CFF',
                        500: '#4E69FF',
                        600: '#1639FF',
                        700: '#0022DD',
                        800: '#0019A5',
                        900: '#00116D',
                  },
            },
            extend: {},
      },
      variants: {
            extend: {},
      },
      plugins: [require('@tailwindcss/forms')],
};
