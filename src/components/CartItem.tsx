import CartProduct from "../interfaces/CartProduct";
import './CartItem.css'

type Props = {
  product: CartProduct;
}

export function CartItem ({product}: Props) {
  return (
    <article className="product">
      <span className="image">
        <div className="image-container">
          <img src={product.product.image}
               alt={product.product.title} />
        </div>
      </span>
      <span className="info">
        <span className="title">
          <strong>{product.product.title}</strong>
        </span>
        <span className="price">
          <span className="unit-price">
            <small>Unidad</small>
            <span>${product.product.price.toFixed(2)}</span>
          </span>
          <span className="amount">
            <small>Cantidad</small>
            {product.amount}
          </span>
          <span className="total-price">
            <small>Total</small>
            <span>
              ${(product.amount * product.product.price).toFixed(2)}
            </span>
          </span>
        </span>
      </span>
    </article>
  );
}