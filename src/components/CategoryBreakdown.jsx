import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const CategoryBreakdown = ({ expensesByCategory }) => {
  const chartData = expensesByCategory
    .filter(category => category.total > 0)
    .map(category => ({
      name: category.name,
      value: category.total,
      color: getColorFromClass(category.color)
    }));

  function getColorFromClass(colorClass) {
    const colorMap = {
      'category-food': '#ff6b6b',
      'category-transport': '#4ecdc4',
      'category-entertainment': '#a8edea',
      'category-shopping': '#ffecd2',
      'category-health': '#a8e6cf',
      'category-education': '#ffd3a5',
      'category-bills': '#667eea',
      'category-other': '#f093fb'
    };
    return colorMap[colorClass] || '#f093fb';
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-white/20">
          <p className="text-white font-medium">{payload[0].name}</p>
          <p className="text-white">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Gastos por Categoría
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {expensesByCategory
                .filter(category => category.total > 0)
                .sort((a, b) => b.total - a.total)
                .map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 glass-button rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center text-sm`}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${category.total.toFixed(2)}</div>
                      <div className="text-xs text-gray-300">{category.expenses.length} gastos</div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-300">No hay datos para mostrar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;