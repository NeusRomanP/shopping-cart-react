import CartProduct from "../interfaces/CartProduct";

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
          <p key={key}>{key} - {value.product.title}</p>
        ))
        : (
          <p>No hay productos en el carrito</p>
        )
      }
    </section>
  );
}