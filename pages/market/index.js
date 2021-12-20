import { useState } from "react";
import Head from "next/head";
import Product from "../../components/Product/Product";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import { useStateValue } from "../../context-api/StateProvider";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckoutProduct from "../../components/CheckoutProducts/CheckoutProducts";
import Subtotal from "../../components/Subtotal/Subtotal";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const MarketPlace = ({ products }) => {
  const [showCartItems, setShowCartItems] = useState(false);
  const [{ cart }] = useStateValue();

  const showItems = (e) => {
    e.preventDefault();
    setShowCartItems(!showCartItems);
  };

  return (
    <div>
      <Head>
        <title>Connect: MarketPlace</title>
        <meta name="MarketPlace" content="Socialize in a better way" />
      </Head>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <h2 className="text-xl font-mono font-semibold py-2 ml-5">
        Top listed products
      </h2>
      <div className="p-5 flex flex-col-reverse md:flex-row">
        <div className="px-5 bg-gray-50 overflow-y-scroll scrollbar-hide center-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              category={product.category}
              description={product.description}
              image={product.image}
              price={product.price}
              title={product.title}
              rating={product.rating}
            />
          ))}
        </div>
        <div className="p-3">
          <div className="flex items-center px-3  w-full border-b-2 border-gray-300">
            <h3 className="font-extrabold font-mono text-md md:text-lg">
              Your cart
            </h3>
            <IconButton className="flex ml-auto pr-5 md:ml-auto">
              <StyledBadge badgeContent={`${cart?.length}`} color="primary">
                <ShoppingCartIcon className="text-black text-3xl" />
              </StyledBadge>
            </IconButton>
          </div>
          <div className="hidden lg:inline-flex flex flex-col ml-20 ">
            {cart?.length > 0 && <Subtotal />}
            {cart?.map((product) => (
              <CheckoutProduct
                key={product.id}
                id={product.id}
                category={product.category}
                description={product.description}
                image={product.image}
                price={product.price}
                title={product.title}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;

export const getServerSideProps = async () => {
  const products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return {
    props: {
      products,
    },
  };
};
