import { ProductRecipe } from '../types/bakery';

export const RECIPES_DATA: ProductRecipe[] = [
  {
    productId: 'prod-1', // Bread
    batchSize: 50, // 50 loaves
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 25, unit: 'kg' },
      { ingredientId: 'ing-8', ingredientName: 'Yeast', quantityPerBatch: 0.8, unit: 'kg' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2.5, unit: 'kg' },
      { ingredientId: 'ing-5', ingredientName: 'Milk', quantityPerBatch: 5, unit: 'liters' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 1.5, unit: 'kg' },
    ]
  },
  {
    productId: 'prod-2', // Chocolate Cake
    batchSize: 10, // 10 cakes (1kg each)
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 3, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 3, unit: 'kg' },
      { ingredientId: 'ing-3', ingredientName: 'Eggs', quantityPerBatch: 30, unit: 'pcs' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2, unit: 'kg' },
      { ingredientId: 'ing-7', ingredientName: 'Chocolate', quantityPerBatch: 3.5, unit: 'kg' },
      { ingredientId: 'ing-6', ingredientName: 'Cream', quantityPerBatch: 3, unit: 'liters' },
    ]
  },
  {
    productId: 'prod-3', // Vanilla Cake
    batchSize: 10,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 3.5, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 3, unit: 'kg' },
      { ingredientId: 'ing-3', ingredientName: 'Eggs', quantityPerBatch: 30, unit: 'pcs' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2, unit: 'kg' },
      { ingredientId: 'ing-5', ingredientName: 'Milk', quantityPerBatch: 2, unit: 'liters' },
      { ingredientId: 'ing-6', ingredientName: 'Cream', quantityPerBatch: 3, unit: 'liters' },
    ]
  },
  {
    productId: 'prod-4', // Croissant
    batchSize: 40,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 4, unit: 'kg' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2.2, unit: 'kg' },
      { ingredientId: 'ing-5', ingredientName: 'Milk', quantityPerBatch: 1.5, unit: 'liters' },
      { ingredientId: 'ing-8', ingredientName: 'Yeast', quantityPerBatch: 0.3, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 0.5, unit: 'kg' },
    ]
  },
  {
    productId: 'prod-5', // Muffin
    batchSize: 30,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 2.5, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 1.8, unit: 'kg' },
      { ingredientId: 'ing-3', ingredientName: 'Eggs', quantityPerBatch: 15, unit: 'pcs' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 1.5, unit: 'kg' },
      { ingredientId: 'ing-5', ingredientName: 'Milk', quantityPerBatch: 1.2, unit: 'liters' },
    ]
  },
  {
    productId: 'prod-6', // Donut
    batchSize: 36,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 3, unit: 'kg' },
      { ingredientId: 'ing-2', ingredientName: 'Sugar', quantityPerBatch: 1.2, unit: 'kg' },
      { ingredientId: 'ing-3', ingredientName: 'Eggs', quantityPerBatch: 12, unit: 'pcs' },
      { ingredientId: 'ing-8', ingredientName: 'Yeast', quantityPerBatch: 0.25, unit: 'kg' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 1, unit: 'kg' },
      { ingredientId: 'ing-7', ingredientName: 'Chocolate', quantityPerBatch: 1.5, unit: 'kg' },
    ]
  },
  {
    productId: 'prod-7', // Chicken Puff
    batchSize: 40,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 4, unit: 'kg' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2.5, unit: 'kg' },
      { ingredientId: 'ing-3', ingredientName: 'Eggs', quantityPerBatch: 10, unit: 'pcs' },
    ]
  },
  {
    productId: 'prod-8', // Veg Puff
    batchSize: 40,
    ingredients: [
      { ingredientId: 'ing-1', ingredientName: 'Flour', quantityPerBatch: 4, unit: 'kg' },
      { ingredientId: 'ing-4', ingredientName: 'Butter', quantityPerBatch: 2.5, unit: 'kg' },
    ]
  }
];
