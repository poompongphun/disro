import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        lightBlue: "rgb(202, 216, 237)",
        blue: "rgb(67, 117, 180)",
        mediumBlue: "rgb(48, 88, 145)",
        darkBlue: "rgb(31, 65, 114)"
      }
    },
  },
  plugins: [],
}

// --light-blue-rgb: 202, 216, 237;
//   --blue-rgb: 67, 117, 180;
//   --medium-blue-rgb: 48, 88, 145;
//   --dark-blue-rgb: 31, 65, 114;
export default config
