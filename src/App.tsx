import { useState } from 'react';
import './App.css'
import { ProductForm } from './components/ProductForm'
import Product from './interfaces/Product'
import CartProduct from './interfaces/CartProduct';
import { ProductsCart } from './components/ProductsCart';

function App() {
  const [products, setProducts] = useState<Map<number, CartProduct>>(() => new Map());

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
        newProducts.set(productId, updatedProduct);
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
