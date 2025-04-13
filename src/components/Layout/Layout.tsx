import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const LayoutContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  position: relative;
  text-decoration: none;
  padding: 0.2rem 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.bodyFont};
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, isDarkMode, toggleTheme }) => {
  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Logo to="/">TastyBytes</Logo>
          <NavLinks>
            <ThemeToggle onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout; 