import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { mockRecipes } from '../data/mockRecipes';
import { Recipe, NutritionFacts } from '../types';
import ColorExtractor from '../components/ColorExtractor/ColorExtractor';
import { FaShoppingBasket, FaCheck, FaDownload } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PageContainer = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.background};
  transition: background-color 1s ease-in-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const RecipeContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => 
    theme.colors.background === '#FFFFFF' 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(26, 26, 26, 0.95)'};
  box-shadow: 0 8px 32px ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(0, 0, 0, 0.3)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) =>
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.05)'
      : 'rgba(255, 255, 255, 0.05)'};
  border-radius: 24px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px ${({ theme }) =>
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(0, 0, 0, 0.3)'};

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const RecipeHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 3.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  flex-wrap: wrap;
  font-size: 1.1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
    font-size: 1rem;
  }
`;

const ServingAdjuster = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
`;

const AdjustButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const TabsContainer = styled.div`
  margin-bottom: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)'};
  padding-bottom: 0.5rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 0;
  border-bottom: 2px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ active }) => (active ? 1 : 0)});
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const IngredientActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const IconButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: 1px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.neutralLight};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.neutralDark};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ShoppingListContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutralLight};
`;

const ShoppingListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ShoppingListTitle = styled.h4`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutralDark};
  margin-bottom: 1rem;
`;

const ShoppingListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  font-size: 1rem;
`;

const SuccessMessage = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutralLight};
  font-size: 1.1rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => 
      theme.colors.background === '#FFFFFF'
        ? 'rgba(0, 0, 0, 0.02)'
        : 'rgba(255, 255, 255, 0.02)'};
  }

  > span:first-child {
    min-width: 120px;
    font-weight: 500;
  }
`;

const InstructionsList = styled.ol`
  padding-left: 2rem;
  margin: 0;
`;

const InstructionStep = styled.li`
  margin-bottom: 2rem;
  line-height: 1.8;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  background: ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.2)'};
  border-radius: 12px;
  border: 1px solid ${({ theme }) =>
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.05)'
      : 'rgba(255, 255, 255, 0.05)'};
`;

const CaloriesContainer = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.03)'
      : 'rgba(255, 255, 255, 0.03)'};
`;

const CaloriesTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const CaloriesInfo = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TimerButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-left: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
`;

const NotFoundTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.accentFont};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  margin-top: 1rem;
  transition: opacity 0.2s ease;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const StartCookingButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1.25rem 3rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 3rem auto 1rem;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;

const NutrientChartContainer = styled.div`
  height: 450px;
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.accentFont};
  color: ${({ theme }) => theme.colors.text};
`;

const ChartWrapper = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`;

const TotalCaloriesInfo = styled(CaloriesInfo)`
  margin-top: 1rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => 
    theme.colors.background === '#FFFFFF'
      ? 'rgba(0, 0, 0, 0.1)'
      : 'rgba(255, 255, 255, 0.1)'};
`;

const BackToRecipesButton = styled.button`
  margin-bottom: 1.5rem;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1rem;
  font-weight: 500;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  border-radius: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateX(-4px);
    background: ${({ theme }) => 
      theme.colors.background === '#FFFFFF'
        ? 'rgba(0, 0, 0, 0.05)'
        : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrients'>(
    'ingredients'
  );
  const [servings, setServings] = useState(4);
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [shoppingList, setShoppingList] = useState<Array<{ id: number; name: string; quantity: number; unit: string }>>([]);
  const [availableIngredients, setAvailableIngredients] = useState<number[]>([]);

  const COLORS = [
    '#FF6B6B',  // Moderate red for protein
    '#3EACA8',  // Moderate teal for carbs
    '#547B97',  // Moderate blue for fat
    '#69A2B0',  // Moderate steel blue for fiber
    '#E1B16A'   // Moderate golden for sugar
  ];

  useEffect(() => {
    const foundRecipe = mockRecipes.find((r) => r.id === Number(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setServings(foundRecipe.servings);
    }
  }, [id]);

  const handleColorExtracted = (color: string) => {
    // Add a small delay before changing the color
    setTimeout(() => {
      const lighterColor = color.replace('rgb', 'rgba').replace(')', ', 0.4)');
      setBackgroundColor(lighterColor);
    }, 300);
  };

  const adjustServings = (adjustment: number) => {
    setServings((prev) => Math.max(1, prev + adjustment));
  };

  const toggleShoppingList = (ingredient: { id: number; name: string; quantity: number; unit: string }, adjustedQuantity: number) => {
    setShoppingList(prev => {
      const exists = prev.find(item => item.id === ingredient.id);
      if (exists) {
        return prev.filter(item => item.id !== ingredient.id);
      }
      // Remove from available ingredients if it was there
      setAvailableIngredients(prev => prev.filter(id => id !== ingredient.id));
      return [...prev, { ...ingredient, quantity: adjustedQuantity }];
    });
  };

  const toggleAvailable = (ingredientId: number) => {
    setAvailableIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      }
      // Remove from shopping list if it was there
      setShoppingList(prev => prev.filter(item => item.id !== ingredientId));
      return [...prev, ingredientId];
    });
  };

  const downloadShoppingList = () => {
    const content = shoppingList
      .map(item => `${item.quantity.toFixed(1)} ${item.unit} ${item.name}`)
      .join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe?.title} - Shopping List.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const allIngredientsAvailable = recipe?.ingredients.every(
    ingredient => availableIngredients.includes(ingredient.id)
  );

  const getNutrientData = (nutrition: NutritionFacts) => {
    return [
      { name: 'Protein', value: nutrition.protein },
      { name: 'Carbs', value: nutrition.carbs },
      { name: 'Fat', value: nutrition.fat },
      { name: 'Fiber', value: nutrition.fiber },
      { name: 'Sugar', value: nutrition.sugar }
    ];
  };

  if (!recipe) {
    return (
      <PageContainer>
        <NotFound>
          <NotFoundTitle>Recipe Not Found</NotFoundTitle>
          <p>Sorry, we couldn't find the recipe you're looking for.</p>
          <BackButton onClick={() => navigate('/')}>Back to Recipes</BackButton>
        </NotFound>
      </PageContainer>
    );
  }

  return (
    <PageContainer backgroundColor={backgroundColor}>
      <RecipeContainer>
        <BackToRecipesButton onClick={() => navigate('/')}>
          ← Back to All Recipes
        </BackToRecipesButton>
        <ColorExtractor imageUrl={recipe.image} onColorExtracted={handleColorExtracted} />
        <HeroImage src={recipe.image} alt={recipe.title} />
        <RecipeHeader>
          <Title>{recipe.title}</Title>
          <MetaInfo>
            <span>Prep: {recipe.prepTime}</span>
            <span>Cook: {recipe.cookingTime}</span>
            <span>Difficulty: {recipe.difficulty}</span>
          </MetaInfo>
          <ServingAdjuster>
            <span>Servings:</span>
            <AdjustButton onClick={() => adjustServings(-1)}>-</AdjustButton>
            <span>{servings}</span>
            <AdjustButton onClick={() => adjustServings(1)}>+</AdjustButton>
          </ServingAdjuster>
        </RecipeHeader>

        <TabsContainer>
          <Tabs>
            <Tab
              active={activeTab === 'ingredients'}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </Tab>
            <Tab
              active={activeTab === 'instructions'}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </Tab>
            <Tab
              active={activeTab === 'nutrients'}
              onClick={() => setActiveTab('nutrients')}
            >
              Nutrients
            </Tab>
          </Tabs>

          <ContentContainer>
            {activeTab === 'ingredients' && (
              <>
                <IngredientsList>
                  {recipe.ingredients.map((ingredient) => {
                    const adjustedQuantity = (ingredient.quantity * servings) / recipe.servings;
                    return (
                      <IngredientItem key={ingredient.id}>
                        <span>
                          {adjustedQuantity.toFixed(1)} {ingredient.unit}
                        </span>
                        <span>{ingredient.name}</span>
                        <IngredientActions>
                          <IconButton
                            isActive={shoppingList.some(item => item.id === ingredient.id)}
                            onClick={() => toggleShoppingList(ingredient, adjustedQuantity)}
                            title="Add to shopping list"
                          >
                            <FaShoppingBasket size={16} />
                          </IconButton>
                          <IconButton
                            isActive={availableIngredients.includes(ingredient.id)}
                            onClick={() => toggleAvailable(ingredient.id)}
                            title="Mark as available"
                          >
                            <FaCheck size={16} />
                          </IconButton>
                        </IngredientActions>
                      </IngredientItem>
                    );
                  })}
                </IngredientsList>

                {shoppingList.length > 0 && (
                  <ShoppingListContainer>
                    <ShoppingListHeader>
                      <ShoppingListTitle>Shopping List</ShoppingListTitle>
                      <IconButton
                        onClick={downloadShoppingList}
                        title="Download shopping list"
                      >
                        <FaDownload size={16} />
                      </IconButton>
                    </ShoppingListHeader>
                    {shoppingList.map(item => (
                      <ShoppingListItem key={item.id}>
                        <span>{item.quantity.toFixed(1)} {item.unit}</span>
                        <span>{item.name}</span>
                      </ShoppingListItem>
                    ))}
                  </ShoppingListContainer>
                )}

                {allIngredientsAvailable && (
                  <SuccessMessage>
                    🎉 You have all the ingredients needed for this recipe!
                  </SuccessMessage>
                )}
              </>
            )}

            {activeTab === 'instructions' && (
              <>
                <InstructionsList>
                  {recipe.instructions.map((instruction) => (
                    <InstructionStep key={instruction.step}>
                      {instruction.description}
                      {instruction.hasTimer && (
                        <TimerButton>
                          {instruction.timerDuration}m
                        </TimerButton>
                      )}
                    </InstructionStep>
                  ))}
                </InstructionsList>
                
                <StartCookingButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/recipe/${recipe.id}/cooking`)}
                >
                  👨‍🍳 Enter Chef Mode
                </StartCookingButton>
              </>
            )}

            {activeTab === 'nutrients' && (
              <CaloriesContainer>
                <CaloriesTitle>Nutrition Information</CaloriesTitle>
                
                <CaloriesInfo style={{ fontSize: '1.5rem', textAlign: 'center', margin: '1rem 0' }}>
                  Per serving - {recipe.nutrition.calories} calories
                </CaloriesInfo>

                <NutrientChartContainer>
                  <ChartTitle>Nutrient Distribution (in grams)</ChartTitle>
                  <ChartWrapper>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getNutrientData(recipe.nutrition)}
                          cx="50%"
                          cy="45%"
                          labelLine={true}
                          label={({ name, value }) => `${name}: ${value}g`}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getNutrientData(recipe.nutrition).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartWrapper>
                </NutrientChartContainer>

                <TotalCaloriesInfo>
                  Total calories for {servings} servings: {(recipe.nutrition.calories * servings).toFixed(0)}
                </TotalCaloriesInfo>
              </CaloriesContainer>
            )}
          </ContentContainer>
        </TabsContainer>
      </RecipeContainer>
    </PageContainer>
  );
};

export default RecipeDetailPage; 