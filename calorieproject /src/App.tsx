import React, { useEffect, useState } from 'react';
import { Utensils } from 'lucide-react';
import { AddFoodEntry } from './components/AddFoodEntry';
import { Stats } from './components/Stats';
import { FoodList } from './components/FoodList';
import { FoodEntry, CalorieStats } from './types';
import { supabase } from './utils/supabase';

function App() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [stats, setStats] = useState<CalorieStats>({
    daily: 0,
    weekly: 0,
    monthly: 0
  });

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('food_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
      return;
    }

    setEntries(data || []);
    calculateStats(data || []);
  };

  const calculateStats = (data: FoodEntry[]) => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.setDate(now.getDate() - 7)).toISOString();
    const monthAgo = new Date(now.setDate(now.getDate() - 30)).toISOString();

    const dailyEntries = data.filter(entry => entry.created_at.startsWith(today));
    const weeklyEntries = data.filter(entry => entry.created_at >= weekAgo);
    const monthlyEntries = data.filter(entry => entry.created_at >= monthAgo);

    setStats({
      daily: dailyEntries.reduce((sum, entry) => sum + entry.calories, 0),
      weekly: Math.round(weeklyEntries.reduce((sum, entry) => sum + entry.calories, 0) / 7),
      monthly: Math.round(monthlyEntries.reduce((sum, entry) => sum + entry.calories, 0) / 30)
    });
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center mb-8">
          <Utensils className="w-8 h-8 text-emerald-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Calorie Tracker</h1>
        </div>

        <div className="mb-8">
          <AddFoodEntry onAdd={fetchEntries} />
        </div>

        <Stats stats={stats} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Today's Food Log</h2>
          <FoodList entries={entries} onDelete={fetchEntries} />
        </div>
      </div>
    </div>
  );
}

export default App;