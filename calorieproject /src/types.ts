export interface FoodEntry {
  id: string;
  user_id: string;
  food_name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
}

export interface CalorieStats {
  daily: number;
  weekly: number;
  monthly: number;
}