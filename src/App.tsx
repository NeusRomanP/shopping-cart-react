import { useEffect, useState } from 'react';
import './App.css'
import { ProductForm } from './components/ProductForm'
import Product from './interfaces/Product'
import CartProduct from './interfaces/CartProduct';
import { ProductsCart } from './components/ProductsCart';

function App() {
  const [products, setProducts] = useState<Map<number, CartProduct>>(() => {
    const productsStorage = localStorage.getItem('products');
    return productsStorage
      ? new Map<number, CartProduct>(
        Object.entries(JSON.parse(productsStorage)).map(([key, value]) => [Number(key), value] as [number, CartProduct])
      ) : new Map();
  });
  const [date, setDate] = useState(() => {
    const dateStorage = localStorage.getItem('date');
    return dateStorage || '';
  });

  useEffect(() => {
  }, []);
  
  useEffect(() => {
    console.log(products.size, 'products')
    if (products.size) {
      localStorage.setItem('products', JSON.stringify(Object.fromEntries(products)));
      if (!localStorage.getItem('date')) {
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric"
        };
        const newDate = new Intl.DateTimeFormat('es-ES', options).format(new Date());
        setDate(newDate);
        localStorage.setItem('date', newDate);
      }
    } else {
      localStorage.removeItem('products');
      localStorage.removeItem('date');
      setDate('');
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
        <ProductsCart products={products} changeAmount={changeAmount} date={date} />
      </main>
    </>
  )
}

export default App
