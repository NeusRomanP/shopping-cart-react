import { useEffect, useState } from 'react';
import './App.css'
import { ProductForm } from './components/ProductForm'
import Product from './interfaces/Product'
import CartProduct from './interfaces/CartProduct';
import { ProductsCart } from './components/ProductsCart';

function App() {
  const [products, setProducts] = useState<Map<number, CartProduct>>(() => new Map());

  useEffect(() => {
    const productsStorage = localStorage.getItem('products');
    if (productsStorage) {
      const parsed = JSON.parse(productsStorage);
      const restoredMap = new Map<number, CartProduct>(
        Object.entries(parsed).map(([key, value]) => [Number(key), value] as [number, CartProduct])
      );
      setProducts(restoredMap);
    } else {
      setProducts(new Map());
    }
    
  }, []);
  
  useEffect(() => {
    if (products.size) {
      localStorage.setItem('products', JSON.stringify(Object.fromEntries(products)));
    }
  }, [products]);

  const addProduct = (product: Product, amount: number) => {
    const newProducts = new Map(products);
    const cartProduct = {
      amount: (products.get(product.id)?.amount || 0) + amount,
      product: product
    }

    newProducts.set(product.id, cartProduct);
    setProducts(newProducts);
  }

  const changeAmount = (
    productId: number,
    operation: (currentAmount: number) => number
  ) => {
    setProducts((prevProducts) => {
      const newProducts = new Map(prevProducts);

      const product = newProducts.get(productId);
      if (product) {
        const updatedProduct = { ...product, amount: operation(product.amount) };
        if (updatedProduct.amount === 0) {
          newProducts.delete(productId);
        } else {
          newProducts.set(productId, updatedProduct);
        }
      }

      return newProducts;
    });
  };

  return (
    <>
      <main>
        <section>
          <ProductForm addProduct={addProduct}/>
        </section>
        <ProductsCart products={products} changeAmount={changeAmount} />
      </main>
    </>
  )
}

export default App
