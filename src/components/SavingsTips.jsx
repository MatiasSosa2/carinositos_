import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { savingsTips } from '@/data/savingsTips';

const SavingsTips = () => {
  const [currentTip, setCurrentTip] = useState(null);

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * savingsTips.length);
    setCurrentTip(savingsTips[randomIndex]);
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  if (!currentTip) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card border-0 text-white pulse-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            Consejo de Ahorro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{currentTip.icon}</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{currentTip.title}</h3>
              <p className="text-gray-300 mb-4">{currentTip.description}</p>
              <Button
                onClick={getRandomTip}
                variant="ghost"
                size="sm"
                className="glass-button border border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Otro consejo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SavingsTips;