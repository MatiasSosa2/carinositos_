import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BudgetSettings = ({ monthlyBudget, onUpdateBudget }) => {
  const [newBudget, setNewBudget] = useState(monthlyBudget.toString());
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const budget = parseFloat(newBudget);
    
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un presupuesto válido",
        variant: "destructive"
      });
      return;
    }

    onUpdateBudget(budget);
    toast({
      title: "¡Actualizado!",
      description: `Presupuesto mensual actualizado a $${budget.toFixed(2)}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración del Presupuesto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Presupuesto Mensual
              </label>
              <Input
                type="number"
                step="0.01"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="glass-button border-white/20 text-white placeholder:text-gray-300"
                placeholder="Ingresa tu presupuesto mensual"
              />
            </div>
            <Button 
              type="submit" 
              className="glass-button border-white/30 text-white hover:bg-white/20"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BudgetSettings;