import CartProduct from "../interfaces/CartProduct";
import './CartItem.css';
import {TrashIcon} from '../icons/TrashIcon';

type Props = {
  product: CartProduct;
  changeAmount: (productId: number, operation: (currentAmount: number) => number) => void;
  deleteProduct: (productId: number) => void;
}

export function CartItem ({product, changeAmount, deleteProduct}: Props) {
  return (
    <article className="product">
      <span className="trash" onClick={() => deleteProduct(product.product.id)}>
        <TrashIcon />
      </span>
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
            <span className="amount-options">
              <button className="amount-option decrement"
                      onClick={() => changeAmount(product.product.id, (amount: number) => amount - 1)}>
                <span className="minus">-</span>
              </button>
              <span>{product.amount}</span>
              <button className="amount-option increment"
                      onClick={() => changeAmount(product.product.id, (amount: number) => amount + 1)}>
                <span className="plus">+</span>
              </button>
            </span>
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