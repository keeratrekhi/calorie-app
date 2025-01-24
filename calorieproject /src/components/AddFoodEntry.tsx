import React, { useState } from 'react';
import { Plus, Loader } from 'lucide-react';
import { supabase } from '../utils/supabase';

export function AddFoodEntry({ onAdd }: { onAdd: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would integrate with your preferred LLM service
      // For now, we'll use a mock response
      const mockAnalysis = {
        food_name: prompt,
        calories: Math.floor(Math.random() * 500),
        protein: Math.floor(Math.random() * 30),
        carbs: Math.floor(Math.random() * 50),
        fat: Math.floor(Math.random() * 20)
      };

      const { error } = await supabase
        .from('food_entries')
        .insert([mockAnalysis]);

      if (error) throw error;
      
      setPrompt('');
      onAdd();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you ate... (e.g., 'large apple with 2 tbsp peanut butter')"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
}