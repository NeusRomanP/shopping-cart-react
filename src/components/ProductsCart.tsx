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
          ? (
            <>
              <div className="items">
                {
                  Array.from(products, ([key, value]) => (
                    <CartItem key={key} product={value} changeAmount={changeAmount} deleteProduct={deleteProduct}/>
                  ))
                }
              </div>
              <div className="totals">
                <span>
                  <strong>Total productos: </strong>
                  <span className="total">
                    {Array.from(products.values()).reduce((acc, item) => acc + item.amount, 0)}
                  </span>
                </span>
                <span>
                  <strong>Precio total: </strong>
                  <span className="total">
                    ${Array.from(products.values()).reduce((acc, item) => acc + item.amount * item.product.price, 0).toFixed(2)}
                  </span>
                </span>
              </div>
            </>
          )
          : (
            <p>No hay productos en el carrito</p>
          )
        }
      </main>
    </section>
  );
}