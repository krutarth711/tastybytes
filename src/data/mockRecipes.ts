import { Recipe } from '../types';
import chocoCookiesImg from '../assets/chococookies.jpg';
import creamyPastaImg from '../assets/CreamyPasta.jpg';
import mediterraneanSaladImg from '../assets/MediterraneanSalad.jpg';
import beefWellingtonImg from '../assets/BeefWellington.jpg';
import frenchCroissantImg from '../assets/FrenchCroissant.jpg';
import buddhaBowlImg from '../assets/BuddhaBowl.jpg';
import spicyMisoRamenImg from '../assets/SpicyMisoRamen.jpeg';
import pavlovaImg from '../assets/Pavlova.jpg';

export const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Creamy Garlic Pasta',
    description: 'A quick and comforting pasta dish with a creamy garlic sauce',
    image: creamyPastaImg,
    prepTime: '15 mins',
    cookingTime: '20 mins',
    difficulty: 'Easy',
    servings: 4,
    category: 'Dinner',
    nutrition: {
      calories: 450,
      protein: 12,
      carbs: 65,
      fat: 18,
      fiber: 3,
      sugar: 2
    },
    ingredients: [
      { id: 1, name: 'Fettuccine pasta', quantity: 8, unit: 'oz' },
      { id: 2, name: 'Butter', quantity: 2, unit: 'tbsp' },
      { id: 3, name: 'Garlic', quantity: 4, unit: 'cloves' },
      { id: 4, name: 'Heavy cream', quantity: 1, unit: 'cup' },
      { id: 5, name: 'Parmesan cheese', quantity: 0.5, unit: 'cup' },
    ],
    instructions: [
      {
        step: 1,
        description: 'Bring a large pot of salted water to boil.',
        hasTimer: false,
      },
      {
        step: 2,
        description: 'Cook pasta according to package directions until al dente.',
        hasTimer: true,
        timerDuration: 10,
      },
      {
        step: 3,
        description: 'Meanwhile, melt butter in a large skillet over medium heat. Add garlic and cook until fragrant.',
        hasTimer: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft and chewy chocolate chip cookies with crispy edges',
    image: chocoCookiesImg,
    prepTime: '20 mins',
    cookingTime: '1 mins',
    difficulty: 'Easy',
    servings: 24,
    category: 'Dessert',
    nutrition: {
      calories: 180,
      protein: 2,
      carbs: 25,
      fat: 9,
      fiber: 1,
      sugar: 15
    },
    ingredients: [
      { id: 1, name: 'All-purpose flour', quantity: 2.25, unit: 'cups' },
      { id: 2, name: 'Butter', quantity: 1, unit: 'cup' },
      { id: 3, name: 'Brown sugar', quantity: 0.75, unit: 'cup' },
      { id: 4, name: 'Granulated sugar', quantity: 0.5, unit: 'cup' },
      { id: 5, name: 'Chocolate chips', quantity: 2, unit: 'cups' },
    ],
    instructions: [
      {
        step: 1,
        description: 'Preheat oven to 375°F (190°C).',
        hasTimer: false,
      },
      {
        step: 2,
        description: 'Cream together butter and sugars until light and fluffy.',
        hasTimer: false,
      },
      {
        step: 3,
        description: 'Bake for 10-12 minutes or until edges are lightly browned.',
        hasTimer: true,
        timerDuration: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'Mediterranean Salad',
    description: 'Fresh and healthy Mediterranean salad with feta cheese',
    image: mediterraneanSaladImg,
    prepTime: '15 mins',
    cookingTime: '0 mins',
    difficulty: 'Easy',
    servings: 4,
    category: 'Lunch',
    nutrition: {
      calories: 220,
      protein: 8,
      carbs: 12,
      fat: 16,
      fiber: 4,
      sugar: 6
    },
    ingredients: [
      { id: 1, name: 'Mixed salad greens', quantity: 4, unit: 'cups' },
      { id: 2, name: 'Cherry tomatoes', quantity: 1, unit: 'cup' },
      { id: 3, name: 'Cucumber', quantity: 1, unit: 'medium' },
      { id: 4, name: 'Feta cheese', quantity: 0.5, unit: 'cup' },
      { id: 5, name: 'Olives', quantity: 0.5, unit: 'cup' },
    ],
    instructions: [
      {
        step: 1,
        description: 'Wash and chop all vegetables.',
        hasTimer: false,
      },
      {
        step: 2,
        description: 'Combine all ingredients in a large bowl.',
        hasTimer: false,
      },
      {
        step: 3,
        description: 'Toss with your favorite dressing and serve immediately.',
        hasTimer: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Beef Wellington',
    description: 'A luxurious dish of beef tenderloin wrapped in mushroom duxelles, and prosciutto',
    image: beefWellingtonImg,
    prepTime: '2 hours',
    cookingTime: '45 mins',
    difficulty: 'Hard',
    servings: 6,
    category: 'Dinner',
    nutrition: {
      calories: 850,
      protein: 45,
      carbs: 42,
      fat: 52,
      fiber: 3,
      sugar: 4
    },
    ingredients: [
      { id: 1, name: 'Beef tenderloin', quantity: 2, unit: 'lbs' },
      { id: 2, name: 'Mushrooms', quantity: 1, unit: 'lb' },
      { id: 3, name: 'Prosciutto', quantity: 8, unit: 'slices' },
      { id: 4, name: 'Puff pastry', quantity: 1, unit: 'sheet' },
      { id: 5, name: 'Dijon mustard', quantity: 2, unit: 'tbsp' },
      { id: 6, name: 'Eggs (for egg wash)', quantity: 2, unit: 'large' },
      { id: 7, name: 'Shallots', quantity: 2, unit: 'medium' },
      { id: 8, name: 'Garlic', quantity: 4, unit: 'cloves' },
      { id: 9, name: 'Fresh thyme', quantity: 2, unit: 'sprigs' },
      { id: 10, name: 'Salt and pepper', quantity: 1, unit: 'to taste' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Season beef tenderloin generously with salt and pepper. Sear in a hot pan until browned on all sides.',
        hasTimer: true,
        timerDuration: 8
      },
      {
        step: 2,
        description: 'Let the beef rest and cool completely.',
        hasTimer: true,
        timerDuration: 30
      },
      {
        step: 3,
        description: 'Finely chop mushrooms, shallots, and garlic in a food processor.',
        hasTimer: false
      },
      {
        step: 4,
        description: 'Cook mushroom mixture (duxelles) until all moisture evaporates.',
        hasTimer: true,
        timerDuration: 20
      },
      {
        step: 5,
        description: 'Lay out plastic wrap and arrange prosciutto in a rectangle.',
        hasTimer: false
      },
      {
        step: 6,
        description: 'Spread mushroom mixture over prosciutto.',
        hasTimer: false
      },
      {
        step: 7,
        description: 'Brush beef with Dijon mustard and place on mushroom mixture.',
        hasTimer: false
      },
      {
        step: 8,
        description: 'Use plastic wrap to roll into a tight cylinder. Chill.',
        hasTimer: true,
        timerDuration: 30
      },
      {
        step: 9,
        description: 'Roll out puff pastry and wrap around the beef cylinder.',
        hasTimer: false
      },
      {
        step: 10,
        description: 'Brush with egg wash and score the top in a decorative pattern.',
        hasTimer: false
      },
      {
        step: 11,
        description: 'Chill the assembled Wellington.',
        hasTimer: true,
        timerDuration: 20
      },
      {
        step: 12,
        description: 'Bake at 400°F until golden brown and beef reaches desired temperature.',
        hasTimer: true,
        timerDuration: 40
      }
    ]
  },
  {
    id: 5,
    title: 'French Croissants',
    description: 'Flaky, buttery French croissants made from scratch',
    image: frenchCroissantImg,
    prepTime: '3 hours',
    cookingTime: '20 mins',
    difficulty: 'Hard',
    servings: 12,
    category: 'Breakfast',
    nutrition: {
      calories: 280,
      protein: 5,
      carbs: 32,
      fat: 15,
      fiber: 2,
      sugar: 8
    },
    ingredients: [
      { id: 1, name: 'All-purpose flour', quantity: 4, unit: 'cups' },
      { id: 2, name: 'Active dry yeast', quantity: 2.25, unit: 'tsp' },
      { id: 3, name: 'Sugar', quantity: 0.25, unit: 'cup' },
      { id: 4, name: 'Salt', quantity: 2, unit: 'tsp' },
      { id: 5, name: 'Cold butter', quantity: 1.5, unit: 'cups' },
      { id: 6, name: 'Milk', quantity: 1.25, unit: 'cups' },
      { id: 7, name: 'Egg (for wash)', quantity: 1, unit: 'large' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Dissolve yeast in warm milk with a pinch of sugar.',
        hasTimer: true,
        timerDuration: 5
      },
      {
        step: 2,
        description: 'Mix flour, sugar, and salt. Add yeast mixture to form dough.',
        hasTimer: false
      },
      {
        step: 3,
        description: 'Knead dough until smooth and elastic.',
        hasTimer: true,
        timerDuration: 10
      },
      {
        step: 4,
        description: 'First rise: Let dough rest in refrigerator.',
        hasTimer: true,
        timerDuration: 60
      },
      {
        step: 5,
        description: 'Prepare butter block by pounding cold butter into rectangle.',
        hasTimer: false
      },
      {
        step: 6,
        description: 'First fold: Roll dough, encase butter, fold in thirds.',
        hasTimer: false
      },
      {
        step: 7,
        description: 'Rest in refrigerator.',
        hasTimer: true,
        timerDuration: 30
      },
      {
        step: 8,
        description: 'Second fold: Roll and fold in thirds again.',
        hasTimer: false
      },
      {
        step: 9,
        description: 'Rest in refrigerator.',
        hasTimer: true,
        timerDuration: 30
      },
      {
        step: 10,
        description: 'Third fold: Repeat rolling and folding.',
        hasTimer: false
      },
      {
        step: 11,
        description: 'Final rest in refrigerator.',
        hasTimer: true,
        timerDuration: 60
      },
      {
        step: 12,
        description: 'Roll dough and cut into triangles.',
        hasTimer: false
      },
      {
        step: 13,
        description: 'Shape croissants and let rise until doubled.',
        hasTimer: true,
        timerDuration: 90
      },
      {
        step: 14,
        description: 'Brush with egg wash and bake at 400°F until golden.',
        hasTimer: true,
        timerDuration: 20
      }
    ]
  },
  {
    id: 6,
    title: 'Vegetarian Buddha Bowl',
    description: 'A nourishing bowl of grains, roasted vegetables, and tahini dressing',
    image: buddhaBowlImg,
    prepTime: '20 mins',
    cookingTime: '30 mins',
    difficulty: 'Easy',
    servings: 4,
    category: 'Vegetarian',
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 18,
      fiber: 12,
      sugar: 8
    },
    ingredients: [
      { id: 1, name: 'Quinoa', quantity: 1, unit: 'cup' },
      { id: 2, name: 'Sweet potato', quantity: 2, unit: 'medium' },
      { id: 3, name: 'Chickpeas', quantity: 1, unit: 'can' },
      { id: 4, name: 'Kale', quantity: 4, unit: 'cups' },
      { id: 5, name: 'Avocado', quantity: 1, unit: 'large' },
      { id: 6, name: 'Tahini', quantity: 0.25, unit: 'cup' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Cook quinoa according to package instructions.',
        hasTimer: true,
        timerDuration: 20
      },
      {
        step: 2,
        description: 'Roast sweet potato cubes and chickpeas.',
        hasTimer: true,
        timerDuration: 25
      },
      {
        step: 3,
        description: 'Prepare tahini dressing and massage kale.',
        hasTimer: false
      },
      {
        step: 4,
        description: 'Assemble bowls with all components.',
        hasTimer: false
      }
    ]
  },
  {
    id: 7,
    title: 'Spicy Miso Ramen',
    description: 'Warming bowl of ramen with rich miso broth and fresh toppings',
    image: spicyMisoRamenImg,
    prepTime: '30 mins',
    cookingTime: '45 mins',
    difficulty: 'Medium',
    servings: 4,
    category: 'Dinner',
    nutrition: {
      calories: 520,
      protein: 28,
      carbs: 65,
      fat: 22,
      fiber: 6,
      sugar: 4
    },
    ingredients: [
      { id: 1, name: 'Ramen noodles', quantity: 4, unit: 'portions' },
      { id: 2, name: 'Miso paste', quantity: 4, unit: 'tbsp' },
      { id: 3, name: 'Pork belly', quantity: 0.5, unit: 'lb' },
      { id: 4, name: 'Soft-boiled eggs', quantity: 4, unit: 'large' },
      { id: 5, name: 'Green onions', quantity: 4, unit: 'stalks' },
      { id: 6, name: 'Corn', quantity: 1, unit: 'cup' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Prepare miso broth base.',
        hasTimer: true,
        timerDuration: 15
      },
      {
        step: 2,
        description: 'Cook pork belly until tender.',
        hasTimer: true,
        timerDuration: 30
      },
      {
        step: 3,
        description: 'Boil eggs to soft-boiled consistency.',
        hasTimer: true,
        timerDuration: 6
      },
      {
        step: 4,
        description: 'Cook noodles and assemble bowls.',
        hasTimer: true,
        timerDuration: 5
      }
    ]
  },
  {
    id: 8,
    title: 'Summer Berry Pavlova',
    description: 'Light and airy meringue dessert topped with cream and fresh berries',
    image: pavlovaImg,
    prepTime: '30 mins',
    cookingTime: '90 mins',
    difficulty: 'Medium',
    servings: 8,
    category: 'Dessert',
    nutrition: {
      calories: 320,
      protein: 4,
      carbs: 45,
      fat: 14,
      fiber: 2,
      sugar: 38
    },
    ingredients: [
      { id: 1, name: 'Egg whites', quantity: 4, unit: 'large' },
      { id: 2, name: 'Sugar', quantity: 1, unit: 'cup' },
      { id: 3, name: 'Cornstarch', quantity: 1, unit: 'tbsp' },
      { id: 4, name: 'Heavy cream', quantity: 1, unit: 'cup' },
      { id: 5, name: 'Mixed berries', quantity: 2, unit: 'cups' },
      { id: 6, name: 'Vanilla extract', quantity: 1, unit: 'tsp' }
    ],
    instructions: [
      {
        step: 1,
        description: 'Whip egg whites until soft peaks form.',
        hasTimer: true,
        timerDuration: 5
      },
      {
        step: 2,
        description: 'Gradually add sugar while continuing to whip.',
        hasTimer: true,
        timerDuration: 8
      },
      {
        step: 3,
        description: 'Fold in cornstarch and shape meringue.',
        hasTimer: false
      },
      {
        step: 4,
        description: 'Bake at low temperature until crisp.',
        hasTimer: true,
        timerDuration: 90
      },
      {
        step: 5,
        description: 'Cool completely before topping with cream and berries.',
        hasTimer: true,
        timerDuration: 60
      }
    ]
  }
]; 