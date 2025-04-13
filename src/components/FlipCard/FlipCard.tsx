import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Recipe } from '../../types';

const CardContainer = styled(Link)`
  perspective: 1000px;
  height: 400px;
  text-decoration: none;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
`;

const FlipCardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.2s;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.background === '#FFFFFF' 
    ? 'rgba(0, 0, 0, 0.1)' 
    : 'rgba(0, 0, 0, 0.3)'};
  border: 1px solid ${({ theme }) => theme.colors.background === '#FFFFFF'
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.1)'};
`;

const CardFront = styled(CardSide)``;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  padding: 0.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const RecipeContent = styled.div`
  padding: 0.5rem 1rem 1rem 1rem;
`;

const RecipeTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.accentFont};
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const RecipeDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const RecipeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  flex-grow: 1;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background === '#FFFFFF'
      ? '#f1f1f1'
      : '#2d2d2d'};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 3px;
  }
`;

const IngredientItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background === '#FFFFFF'
    ? 'rgba(0, 0, 0, 0.1)'
    : 'rgba(255, 255, 255, 0.1)'};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
`;

const ViewRecipeButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  display: inline-block;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const BackTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.accentFont};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

interface FlipCardProps {
  recipe: Recipe;
}

const FlipCard: React.FC<FlipCardProps> = ({ recipe }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <CardContainer to={`/recipe/${recipe.id}`}>
      <FlipCardInner
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
      >
        <CardFront>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <RecipeContent>
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <RecipeDescription>{recipe.description}</RecipeDescription>
            <RecipeMeta>
              <span>Prep: {recipe.prepTime}</span>
              <span>{recipe.difficulty}</span>
            </RecipeMeta>
          </RecipeContent>
        </CardFront>

        <CardBack>
          <BackTitle>Ingredients</BackTitle>
          <IngredientsList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>
                <span>{ingredient.name}</span>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </IngredientItem>
            ))}
          </IngredientsList>
          <ViewRecipeButton to={`/recipe/${recipe.id}`}>
            View Full Recipe
          </ViewRecipeButton>
        </CardBack>
      </FlipCardInner>
    </CardContainer>
  );
};

export default FlipCard; 