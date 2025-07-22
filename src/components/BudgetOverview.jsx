import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

const BudgetOverview = ({ monthlyBudget, totalSpent, remainingBudget }) => {
  const spentPercentage = (totalSpent / monthlyBudget) * 100;
  const isOverBudget = remainingBudget < 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Mensual</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyBudget.toFixed(2)}</div>
            <p className="text-xs text-gray-300 mt-1">
              Meta establecida para este mes
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="glass-card border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Gastado</CardTitle>
            <DollarSign className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-red-400" />
              <span className="text-gray-300">{spentPercentage.toFixed(1)}% del presupuesto</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-card border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restante</CardTitle>
            {isOverBudget ? (
              <TrendingDown className="h-4 w-4 text-red-400" />
            ) : (
              <TrendingUp className="h-4 w-4 text-green-400" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
              ${Math.abs(remainingBudget).toFixed(2)}
            </div>
            <p className="text-xs text-gray-300 mt-1">
              {isOverBudget ? 'Excedido por' : 'Disponible para gastar'}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BudgetOverview;