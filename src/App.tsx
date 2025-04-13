import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, lightTheme, darkTheme } from './styles/GlobalStyle';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CookingModePage from './pages/CookingModePage';
import AboutPage from './pages/AboutPage';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Router>
          <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/recipe/:id/cooking" element={<CookingModePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
