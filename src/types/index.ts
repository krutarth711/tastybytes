import { DefaultTheme } from 'styled-components';

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookingTime: string;
  difficulty: string;
  servings: number;
  category: string;
  nutrition: NutritionFacts;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface Instruction {
  step: number;
  description: string;
  hasTimer: boolean;
  timerDuration?: number;
}

export interface CustomTheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    neutralDark: string;
    neutralLight: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    accentFont: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
} 