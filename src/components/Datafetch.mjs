import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

const Datafetch = async () => {
  const query = {
    products: `*[_type == "product"]{
      _id, productName, slug, category, price, inventory, colors, status,
      image{ asset -> { _id, url } }, description
    }`,
    orders: `*[_type == "order"]{
      _id, orderId, customer{firstName, lastName, email, address},
      items[]{name, quantity, price}, totalAmount
    }`,
    users: `*[_type == "user"]{
      _id, email, firstName, lastName, dateOfBirth, country, gender, subscribe
    }`,
  };

  const [products, orders, users] = await Promise.all([
    client.fetch(query.products),
    client.fetch(query.orders),
    client.fetch(query.users),
  ]);

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h1>{product.productName}</h1>
          <p>Price: {product.price}</p>
          <Image
            src={urlFor(product.image.asset.url).url()}
            alt={product.productName}
            width={100}
            height={100}
          />
        </div>
      ))}

      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order ID: {order.orderId}</p>
          <p>Customer: {order.customer.firstName} {order.customer.lastName} ({order.customer.email})</p>
          <p>Address: {order.customer.address}</p>
          <p>Total: {order.totalAmount}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} - {item.quantity} x ${item.price}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2>Users</h2>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.firstName} {user.lastName} ({user.email})</p>
          <p>DOB: {user.dateOfBirth}</p>
          <p>Country: {user.country}</p>
          <p>Gender: {user.gender}</p>
          <p>Subscribed: {user.subscribe ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default Datafetch;
