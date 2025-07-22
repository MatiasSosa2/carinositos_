import { useState, useMemo, useEffect } from 'react';
import { products as allProducts } from '@/data/products';

const getCategoryFromPath = (path) => {
  const parts = path.split('/');
  const categoryIndex = parts.indexOf('catalogo');
  if (categoryIndex !== -1 && categoryIndex + 1 < parts.length) {
    const category = parts[categoryIndex + 1];
    // Capitalize first letter for matching
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
  return '';
};

export const useProducts = (location) => {
  const initialCategory = getCategoryFromPath(location.pathname);
  
  const initialFilters = {
    searchTerm: '',
    category: initialCategory,
    priceRange: [0, 200],
    color: '',
    size: '',
    sortBy: 'relevance',
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const newCategory = getCategoryFromPath(location.pathname);
    setFilters(prev => ({ ...initialFilters, category: newCategory, searchTerm: prev.searchTerm }));
  }, [location.pathname]);

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by search term
    if (filters.searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filters.category) {
      products = products.filter(p => p.category === filters.category);
    }

    // Filter by price range
    products = products.filter(p => {
      const price = p.price * (1 - p.discount / 100);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filter by color
    if (filters.color) {
      products = products.filter(p => p.colors.includes(filters.color));
    }

    // Filter by size
    if (filters.size) {
      products = products.filter(p => p.sizes.includes(filters.size));
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-asc':
        products.sort((a, b) => (a.price * (1 - a.discount / 100)) - (b.price * (1 - b.discount / 100)));
        break;
      case 'price-desc':
        products.sort((a, b) => (b.price * (1 - b.discount / 100)) - (a.price * (1 - a.discount / 100)));
        break;
      case 'newest':
        products.sort((a, b) => b.isNew - a.isNew);
        break;
      default: // relevance (no specific sort)
        break;
    }

    return products;
  }, [filters]);
  
  const resetFilters = () => {
    const currentCategory = getCategoryFromPath(location.pathname);
    setFilters({...initialFilters, category: currentCategory});
  };

  return { products: filteredProducts, allProducts, filters, setFilters, resetFilters };
};