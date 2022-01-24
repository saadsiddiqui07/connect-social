import Head from "next/head";
import { useState } from "react";
import { useStateValue } from "../../context-api/StateProvider";
import { Badge, IconButton, Drawer } from "@mui/material/";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Product from "../../components/Product/Product";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import Header from "../../components/Header/Header";
import Cart from "../../components/Cart/Cart";

const MarketPlace = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [{ cart }] = useStateValue();

  return (
    <div>
      <Head>
        <title>Connect: MarketPlace</title>
        <meta name="MarketPlace" content="Socialize in a better way" />
      </Head>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Cart setOpen={setOpen} />
      </Drawer>

      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <div className="flex items-center ">
        <IconButton onClick={() => setOpen(true)} className="ml-auto pr-4">
          <Badge badgeContent={cart?.length} color="success">
            <ShoppingCartIcon className="text-blue-500" fontSize="large" />
          </Badge>
        </IconButton>
      </div>
      <div className="p-5 flex flex-col-reverse md:flex-row">
        <div className="px-5 bg-white overflow-y-scroll scrollbar-hide center-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
          {products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              setOpen={setOpen}
              {...product}
            />
          ))}
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
      products: products || null,
    },
  };
};
