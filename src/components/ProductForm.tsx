import { useState } from "react";
import Product from "../interfaces/Product";
import './ProductForm.css';

type Props = {
  addProduct: (product: Product, amount: number) => void;
  error: string;
  handleSetError: (err: string) => void;
}

export function ProductForm ({ addProduct, error, handleSetError }: Props) {

  const [amount, setAmount] = useState('');
  const [productId, setProductId] = useState('');

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmount(value);
  };

  const handleChangeProductId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProductId(value);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const data = await res.json();

      addProduct(data, Number(amount));
    } catch (e) {
      console.log(e);
      handleSetError('Este producto no existe.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Agrega productos al carrito de compra</p>
        <div className="inputs">
          <div className="input">
            <label htmlFor="amount">Cantidad</label>
            <input type="number" 
                   placeholder="Cantidad"
                   name="amount"
                   id="amount"
                   min={1}
                   max={99}
                   value={amount}
                   required
                   onChange={handleChangeAmount} />
          </div>
          <div className="input">
            <label htmlFor="productId">Producto</label>
            <input type="text"
                   placeholder="Id producto"
                   name="productId"
                   id="productId"
                   value={productId}
                   required
                   onChange={handleChangeProductId} />
          </div>
          
          <button type="submit">Añadir</button>
        </div>
        <p className="error">{error}</p>
      </form>
    </>
  );
}