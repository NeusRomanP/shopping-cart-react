import { useState } from "react";
import Product from "../interfaces/Product";

type Props = {
  addProduct: (product: Product, amount: number) => void;
}

export function ProductForm ({ addProduct }: Props) {

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
      console.log(e)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="number" 
                 placeholder="Cantidad"
                 name="amount"
                 id="amount"
                 min={1}
                 max={99}
                 value={amount}
                 required
                 onChange={handleChangeAmount} />
          <input type="text"
                 placeholder="Id producto"
                 name="productId"
                 id="productId"
                 value={productId}
                 required
                 onChange={handleChangeProductId} />
          <button type="submit">Añadir</button>
        </div>
      </form>
    </>
  );
}