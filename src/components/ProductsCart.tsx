import CartProduct from "../interfaces/CartProduct";
import { CartItem } from "./CartItem";

type Props = {
  products: Map<number, CartProduct>;
}

export function ProductsCart ({products}: Props) {
  return (
    <section>
      <h3>Productos del carrito</h3>
      {
        products.size
        ? Array.from(products, ([key, value]) => (
          <CartItem key={key} product={value} />
        ))
        : (
          <p>No hay productos en el carrito</p>
        )
      }
    </section>
  );
}