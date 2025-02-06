const response = await fetch("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ items: cartItems }), 
});

const session = await response.json();

if (!session.id) {
  console.error("Error: Stripe session ID is undefined");
}

await stripe.redirectToCheckout({ sessionId: session.id });
