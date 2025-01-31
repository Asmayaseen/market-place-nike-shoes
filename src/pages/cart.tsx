import { useCart } from "@/components/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
