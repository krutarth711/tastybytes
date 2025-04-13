import React, { useState } from 'react';
import styled from 'styled-components';
import { mockRecipes } from '../data/mockRecipes';
import FlipCard from '../components/FlipCard/FlipCard';
import { FaSearch } from 'react-icons/fa';

const PageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 0 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 3rem 2rem 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  border-radius: 50px;
  border: 2px solid ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)'};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 2rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.background};
  color: ${({ theme, active }) =>
    active ? theme.colors.background : theme.colors.text};
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 100%;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  width: 100%;
`;

const categories = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Vegetarian',
];

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || (
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ingredient => 
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer>
      <HeroSection>
        <Title>Welcome to TastyBytes</Title>
        <Subtitle>
          Discover delicious recipes, cooking tips, and culinary inspiration
        </Subtitle>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search recipes by name, description, or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
      </HeroSection>

      <CategoryFilter>
        {categories.map((category) => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>

      {filteredRecipes.length > 0 ? (
        <RecipeGrid>
          {filteredRecipes.map((recipe) => (
            <FlipCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeGrid>
      ) : (
        <NoResults>
          No recipes found matching your search criteria. Try adjusting your search or category filter.
        </NoResults>
      )}
    </PageContainer>
  );
};

export default HomePage; 