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

  return (
    <>
      <main>
        <section>
          <ProductForm addProduct={addProduct}/>
        </section>
        <ProductsCart products={products} />
      </main>
    </>
  )
}

export default App
