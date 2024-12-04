import React from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'lucide-react';

export const CategoryList = ({ categories, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {categories.map((category) => (
        <Link key={category.id} to={`/category/${category.id}`}>
          <div className="p-4 rounded-lg border hover:bg-gray-100">
            <h2 className="text-lg font-semibold">{category.name}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
};