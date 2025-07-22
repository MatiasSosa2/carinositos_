import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LayoutTemplate as Template, Eye } from 'lucide-react';
import { budgetTemplates } from '@/data/budgetTemplates';
import { useToast } from '@/components/ui/use-toast';

const BudgetTemplates = ({ onApplyTemplate }) => {
  const { toast } = useToast();

  const handleApplyTemplate = (template) => {
    onApplyTemplate(template.monthlyBudget);
    toast({
      title: "Plantilla aplicada",
      description: `Presupuesto actualizado a $${template.monthlyBudget} basado en "${template.name}"`
    });
  };

  return (
    <Card className="glass-card border-0 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Template className="h-5 w-5" />
          Plantillas de Presupuesto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="glass-button p-4 rounded-lg border border-white/10 h-full flex flex-col">
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">{template.icon}</div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{template.description}</p>
                  <div className="text-xl font-bold text-green-400">
                    ${template.monthlyBudget}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 glass-button border border-white/20 text-white hover:bg-white/10">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border border-white/20 text-white max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {template.icon} {template.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-gray-300">{template.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Distribución sugerida:</h4>
                          {template.categories.map((category, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 glass-button rounded">
                              <span>{category.name}</span>
                              <div className="text-right">
                                <div className="font-semibold">${category.amount}</div>
                                <div className="text-xs text-gray-300">{category.percentage}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => handleApplyTemplate(template)}
                          className="w-full glass-button border border-white/30 text-white hover:bg-white/20"
                        >
                          Aplicar esta plantilla
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    onClick={() => handleApplyTemplate(template)}
                    size="sm"
                    className="flex-1 glass-button border border-white/30 text-white hover:bg-white/20"
                  >
                    Aplicar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTemplates;