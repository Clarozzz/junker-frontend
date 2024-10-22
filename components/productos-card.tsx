"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const ProductShowcase = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          whileHover={{ scale: 1.05 }}
        >
          <Card>
            <CardContent className="p-4">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Agregar al Carrito
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductShowcase;