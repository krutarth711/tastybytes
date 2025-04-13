import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    neutralDark: '#292F36',
    neutralLight: '#F7F9FB',
    accent: '#FFD166',
    background: '#FFFFFF',
    text: '#292F36',
  },
  typography: {
    headingFont: "'Nunito Sans', sans-serif",
    bodyFont: "'Nunito Sans', sans-serif",
    accentFont: "'Nunito Sans', sans-serif",
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export const darkTheme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    neutralDark: '#F7F9FB',
    neutralLight: '#292F36',
    accent: '#FFD166',
    background: '#1A1A1A',
    text: '#F7F9FB',
  },
  typography: {
    headingFont: "'Nunito Sans', sans-serif",
    bodyFont: "'Nunito Sans', sans-serif",
    accentFont: "'Nunito Sans', sans-serif",
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
};

export type Theme = typeof lightTheme;

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.typography.bodyFont};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.headingFont};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }
`; 