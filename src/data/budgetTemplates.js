export const budgetTemplates = [
  {
    id: 1,
    name: "Estudiante Universitario",
    description: "Presupuesto básico para estudiantes con ingresos limitados",
    monthlyBudget: 800,
    categories: [
      { name: "Comida", percentage: 35, amount: 280 },
      { name: "Transporte", percentage: 15, amount: 120 },
      { name: "Entretenimiento", percentage: 10, amount: 80 },
      { name: "Educación", percentage: 25, amount: 200 },
      { name: "Otros", percentage: 15, amount: 120 }
    ],
    icon: "🎓"
  },
  {
    id: 2,
    name: "Profesional Joven",
    description: "Para recién graduados con su primer trabajo",
    monthlyBudget: 2000,
    categories: [
      { name: "Comida", percentage: 25, amount: 500 },
      { name: "Transporte", percentage: 15, amount: 300 },
      { name: "Entretenimiento", percentage: 15, amount: 300 },
      { name: "Facturas", percentage: 20, amount: 400 },
      { name: "Ahorro", percentage: 15, amount: 300 },
      { name: "Otros", percentage: 10, amount: 200 }
    ],
    icon: "💼"
  },
  {
    id: 3,
    name: "Familia con Hijos",
    description: "Presupuesto familiar para padres con hijos pequeños",
    monthlyBudget: 3500,
    categories: [
      { name: "Comida", percentage: 30, amount: 1050 },
      { name: "Transporte", percentage: 12, amount: 420 },
      { name: "Salud", percentage: 15, amount: 525 },
      { name: "Educación", percentage: 18, amount: 630 },
      { name: "Facturas", percentage: 15, amount: 525 },
      { name: "Entretenimiento", percentage: 5, amount: 175 },
      { name: "Otros", percentage: 5, amount: 175 }
    ],
    icon: "👨‍👩‍👧‍👦"
  },
  {
    id: 4,
    name: "Jubilado",
    description: "Presupuesto optimizado para personas jubiladas",
    monthlyBudget: 1200,
    categories: [
      { name: "Comida", percentage: 30, amount: 360 },
      { name: "Salud", percentage: 25, amount: 300 },
      { name: "Facturas", percentage: 25, amount: 300 },
      { name: "Transporte", percentage: 8, amount: 96 },
      { name: "Entretenimiento", percentage: 7, amount: 84 },
      { name: "Otros", percentage: 5, amount: 60 }
    ],
    icon: "👴"
  },
  {
    id: 5,
    name: "Emprendedor",
    description: "Para personas con ingresos variables que trabajan por cuenta propia",
    monthlyBudget: 2500,
    categories: [
      { name: "Comida", percentage: 20, amount: 500 },
      { name: "Transporte", percentage: 10, amount: 250 },
      { name: "Facturas", percentage: 25, amount: 625 },
      { name: "Educación", percentage: 15, amount: 375 },
      { name: "Ahorro de emergencia", percentage: 20, amount: 500 },
      { name: "Entretenimiento", percentage: 5, amount: 125 },
      { name: "Otros", percentage: 5, amount: 125 }
    ],
    icon: "🚀"
  }
];