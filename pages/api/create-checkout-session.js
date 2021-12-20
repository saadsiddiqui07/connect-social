const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { cart, email } = req.body;
  //  console.log(cart, email);

  // transforming data as per STRIPE'S API
  const cartData = cart.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: cartData,
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(cart.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};
