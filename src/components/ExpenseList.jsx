import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ExpenseList = ({ expenses, categories, onDeleteExpense }) => {
  const { toast } = useToast();

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || { name: 'Desconocido', icon: '❓', color: 'category-other' };
  };

  const handleDelete = (id, description) => {
    onDeleteExpense(id);
    toast({
      title: "Gasto eliminado",
      description: `"${description}" ha sido eliminado correctamente`
    });
  };

  if (expenses.length === 0) {
    return (
      <Card className="glass-card border-0 text-white">
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">💸</div>
          <h3 className="text-xl font-semibold mb-2">No hay gastos registrados</h3>
          <p className="text-gray-300">Agrega tu primer gasto usando el formulario de arriba</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Gastos Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {expenses.map((expense, index) => {
              const categoryInfo = getCategoryInfo(expense.category);
              return (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 glass-button rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${categoryInfo.color} flex items-center justify-center text-white font-semibold`}>
                      {categoryInfo.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{expense.description}</h4>
                      <p className="text-sm text-gray-300">
                        {categoryInfo.name} • {new Date(expense.date).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">${expense.amount.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(expense.id, expense.description)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;