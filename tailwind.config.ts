import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '744px',
        // => @media (min-width: 744px) { ... }
        xl: '1200px',
        // => @media (min-width: 1280px) { ... }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: {
          100: '#787878',
          200: '#6B6B6B',
          300: '#5E5E5E',
          400: '#525252',
          500: '#454545',
          600: '#373737',
          700: '#2B2B2B',
          800: '#1F1F1F',
          900: '#121212',
          950: '#050505',
        },
        gray: {
          100: '#DEDEDE',
          200: '#C4C4C4',
          300: '#ABABAB',
          400: '#919191',
        },
        blue: {
          100: '#FFFFFF',
          200: '#ECEFF4',
          300: '#CBD3E1',
          400: '#ABB8CE',
          500: '#8B9DBC',
          600: '#6A82A9',
          700: '#52698E',
          800: '#40516E',
          900: '#2D394E',
          950: '#1A212D',
        },
        red: {
          100: "#FF6577",
        },
        bg: {
          100: "#F5F7FA",
          200: "#AFBACD",
        },
        line: {
          100: '#F2F2F2',
          200: '#CFDBEA',
        },
        illust: {
          yellow: '#FBC85B',
          green: '#48BB98',
          purple: '#8E80E3',
          blue: '#5195EE',
          red: '#E46E80',
          brown: '#9A695E',
          'sub-yellow': '#E8AA26',
          'sub-blue_1': '#3E3E3E',
          'sub-blue_2': '#3E414D',
          'sub-blue_3': '#494D59',
          'sub-gray_1': '#C7D1E0',
          'sub-gray_2': '#E3E9F1',
          'sub-gray_3': '#EFF3F8',
        },
        state: {
          error: '#FF6577',
        },
        dim: 'rgba(0,0,0,0.6)',
      },
      fontSize: {
        '8': '0.5rem',
        '9': '0.5625rem',
        '10': '0.625rem',
        '11': '0.6875rem',
        '12': '0.75rem',
        '13': '0.8125rem',
        '14': '0.875rem',
        '15': '0.9375rem',
        '16': '1rem',
        '17': '1.0625rem',
        '18': '1.125rem',
        '19': '1.1875rem',
        '20': '1.25rem',
        '24': '1.5rem',
        '30': '1.875rem',
        '32': '2rem',
        '40': '2.5rem',
        '50': '3.125rem',
        '60': '3.75rem',
        '70': '4.375rem',
        '80': '5rem',
        '90': '5.625rem',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        iropke: ['IropkeBatang', 'sans-serif'],
      },
      borderRadius: {
        '1/2': '50%',
      },
      lineHeight: {
        '18': '1.125rem',
        '20': '1.25rem',
        '22': '1.375rem',
        '24': '1.5rem',
        '26': '1.625rem',
        '28': '1.75rem',
        '30': '1.875rem',
        '32': '2rem',
        '40': '2.5rem',
        '42': '2.625rem',
        '48': '3rem',
        '52': '3.25rem',
      },
      boxShadow: {
        'custom-hover': '0 0 11px rgba(33,33,33,.2)',
        'custom-focus': 'inset 0 -2px 0 0 #40516E',
        'custom-focus-xl': 'inset 0 -3px 0 0 #40516E',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.note': {
          background:
            'linear-gradient(to bottom, #f2f2f2 1px, #fff 1px 19px) center -1px / auto 20px repeat-y',
          borderRadius: '16px',
          border: '1px solid #f2f2f2',
          boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
        },
        '.border-bottom-zigzag': {
          background: '#ccc',
          borderImage:
            "url('../../public/assets/border_note.svg') 40 / 14px 40px / 0 0 14px 0 round",
        },
        '.shadow-1': {
          boxShadow: '0 0 36px rgba(0,0,0,0.05)',
        },
        // main text -  pretendard
        // 3xl
        '.typo-3xl-bold': {
          fontSize: theme('fontSize.32'),
          lineHeight: theme('lineHeight.42'),
          fontWeight: theme('fontWeight.bold'),
        },
        // 2xl
        '.typo-2xl-bold': {
          fontSize: theme('fontSize.24'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.typo-2xl-semibold': {
          fontSize: theme('fontSize.24'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-2xl-medium': {
          fontSize: theme('fontSize.24'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.typo-2xl-regular': {
          fontSize: theme('fontSize.24'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.normal'),
        },
        // xl
        '.typo-xl-semibold': {
          fontSize: theme('fontSize.20'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-xl-medium': {
          fontSize: theme('fontSize.20'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.typo-xl-regular': {
          fontSize: theme('fontSize.20'),
          lineHeight: theme('lineHeight.32'),
          fontWeight: theme('fontWeight.normal'),
        },
        // 2lg
        '.typo-2lg-bold': {
          fontSize: theme('fontSize.18'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.typo-2lg-semibold': {
          fontSize: theme('fontSize.18'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-2lg-medium': {
          fontSize: theme('fontSize.18'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.typo-2lg-regular': {
          fontSize: theme('fontSize.18'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.normal'),
        },
        // lg
        '.typo-lg-semibold': {
          fontSize: theme('fontSize.16'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-lg-medium': {
          fontSize: theme('fontSize.16'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.typo-lg-regular': {
          fontSize: theme('fontSize.16'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.normal'),
        },
        // md
        '.typo-md-bold': {
          fontSize: theme('fontSize.14'),
          lineHeight: theme('lineHeight.24'),
          fontWeight: theme('fontWeight.bold'),
        },
        '.typo-md-semibold': {
          fontSize: theme('fontSize.14'),
          lineHeight: theme('lineHeight.24'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-md-medium': {
          fontSize: theme('fontSize.14'),
          lineHeight: theme('lineHeight.24'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.typo-md-regular': {
          fontSize: theme('fontSize.14'),
          lineHeight: theme('lineHeight.24'),
          fontWeight: theme('fontWeight.normal'),
        },
        // sm
        '.typo-sm-medium': {
          fontSize: theme('fontSize.13'),
          lineHeight: theme('lineHeight.22'),
          fontWeight: theme('fontWeight.medium'),
        },
        // xs
        '.typo-xs-semibold': {
          fontSize: theme('fontSize.12'),
          lineHeight: theme('lineHeight.20'),
          fontWeight: theme('fontWeight.semibold'),
        },
        '.typo-xs-regular': {
          fontSize: theme('fontSize.12'),
          lineHeight: theme('lineHeight.18'),
          fontWeight: theme('fontWeight.normal'),
        },
        // 이롭게 바탕체
        '.iropke-4xl': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.40'),
          lineHeight: theme('lineHeight.52'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-3xl': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.32'),
          lineHeight: theme('lineHeight.48'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-2xl': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.24'),
          lineHeight: theme('lineHeight.40'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-xl': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.20'),
          lineHeight: theme('lineHeight.28'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-lg': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.16'),
          lineHeight: theme('lineHeight.26'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-md': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.14'),
          lineHeight: theme('lineHeight.24'),
          fontWeight: theme('fontWeight.medium'),
        },
        '.iropke-xs': {
          fontFamily: theme('fontFamily.iropke'),
          fontSize: theme('fontSize.12'),
          lineHeight: theme('lineHeight.18'),
          fontWeight: theme('fontWeight.medium'),
        },
      });
    }),
  ],
};
export default config;
