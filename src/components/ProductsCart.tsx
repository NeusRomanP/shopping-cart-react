import CartProduct from "../interfaces/CartProduct";
import { CartItem } from "./CartItem";
import './ProductsCart.css'

type Props = {
  products: Map<number, CartProduct>;
  date: string;
  changeAmount: (productId: number, operation: (currentAmount: number) => number) => void;
  deleteProduct: (productId: number) => void
}

export function ProductsCart ({products, date ,changeAmount, deleteProduct}: Props) {
  return (
    <section>
      <h3>Productos del carrito</h3>
      <p>{date}</p>
      <main className="products-list">
        {
          products.size
          ? Array.from(products, ([key, value]) => (
            <CartItem key={key} product={value} changeAmount={changeAmount} deleteProduct={deleteProduct}/>
          ))
          : (
            <p>No hay productos en el carrito</p>
          )
        }
      </main>
    </section>
  );
}