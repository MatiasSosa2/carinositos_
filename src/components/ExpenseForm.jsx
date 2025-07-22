import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ExpenseForm = ({ categories, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!description || !amount || !category) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido",
        variant: "destructive"
      });
      return;
    }

    onAddExpense({
      description,
      amount: numAmount,
      category
    });

    setDescription('');
    setAmount('');
    setCategory('');

    toast({
      title: "¡Éxito!",
      description: "Gasto agregado correctamente"
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card border-0 text-white mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Agregar Nuevo Gasto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Descripción del gasto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="glass-button border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
              <div>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Monto"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="glass-button border-white/20 text-white placeholder:text-gray-300"
                />
              </div>
              <div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="glass-button border-white/20 text-white">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-white/20">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-white hover:bg-white/10">
                        {cat.icon} {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button 
              type="submit" 
              className="glass-button w-full md:w-auto border-white/30 text-white hover:bg-white/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Gasto
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExpenseForm;