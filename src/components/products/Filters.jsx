import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from 'lucide-react';

const Filters = ({ filters, setFilters, allProducts, resetFilters }) => {
  const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
  const uniqueColors = [...new Set(allProducts.flatMap(p => p.colors))];
  const uniqueSizes = [...new Set(allProducts.flatMap(p => p.sizes))];

  const handlePriceChange = (value) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold flex items-center gap-2"><SlidersHorizontal className="h-5 w-5"/>Filtros</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <X className="h-4 w-4 mr-1"/> Limpiar
        </Button>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Categoría</label>
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters(prev => ({...prev, category: value === 'all' ? '' : value }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Precio</label>
        <Slider
          min={0}
          max={200}
          step={5}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mt-3"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Color</label>
        <Select
          value={filters.color}
          onValueChange={(value) => setFilters(prev => ({...prev, color: value === 'all' ? '' : value }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {uniqueColors.map(color => <SelectItem key={color} value={color}>{color}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Talle</label>
        <Select
          value={filters.size}
          onValueChange={(value) => setFilters(prev => ({...prev, size: value === 'all' ? '' : value }))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {uniqueSizes.map(size => <SelectItem key={size} value={size}>{size}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Ordenar por</label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => setFilters(prev => ({...prev, sortBy: value}))}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Relevancia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevancia</SelectItem>
            <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
            <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
            <SelectItem value="newest">Más Nuevos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;