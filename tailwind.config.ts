import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        'primary-color': '#3D195B',
        'secondary-color': '#45FFA6',
        'secondary-color-hover': '#39DD94',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require('daisyui/src/theming/themes')['cupcake'],
          primary: '#3D195B',
          secondary: '#45FFA6',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
export default config
