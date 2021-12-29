import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useStateValue } from "../../context-api/StateProvider";

const CheckoutProduct = ({ id, title, price, rating, image, category }) => {
  const [{}, dispatch] = useStateValue();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <Card className="m-8 shadow-lg flex flex-col w-full cursor-pointer">
      <div className="p-2">
        <div className="flex py-1 justify-between items-center">
          <p className="text-sm capitalize font-extrabold">{category}</p>
        </div>
        <p className="text-sm">{title}</p>
      </div>
      <CardContent>
        <img
          src={image}
          alt=""
          className="h-24 w-full object-contain cursor-pointer transition-all duration-200 ease-in-out transform sm:hover:scale-125 hover:z-50"
        />
      </CardContent>
      <CardActions className="flex mt-auto w-full justify-between  items-center">
        <p className="font-bold text-lg">${price}</p>

        <button
          onClick={removeFromCart}
          className="text-sm font-bold flex  text-white bg-gray-500 p-1 rounded"
        >
          Remove
        </button>
      </CardActions>
    </Card>
  );
};

export default CheckoutProduct;
