import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalorieStats } from '../types';
import { Activity, Calendar, TrendingUp } from 'lucide-react';

interface StatsProps {
  stats: CalorieStats;
}

export function Stats({ stats }: StatsProps) {
  const data = [
    { name: 'Daily', calories: stats.daily },
    { name: 'Weekly Avg', calories: stats.weekly },
    { name: 'Monthly Avg', calories: stats.monthly },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">Calorie Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Activity className="text-emerald-500" />
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.daily} kcal</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="text-blue-500" />
            <span className="text-sm text-gray-600">Weekly Avg</span>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.weekly} kcal</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-purple-500" />
            <span className="text-sm text-gray-600">Monthly Avg</span>
          </div>
          <p className="text-2xl font-bold mt-2">{stats.monthly} kcal</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}