import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { useStateValue } from "../../context-api/StateProvider";

export default function Product({ id, image, price, title, rating, category }) {
  const [{ cart }, dispatch] = useStateValue();
  const [disableButton, setDisableButton] = React.useState(false);
  console.log(cart?.length);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id,
        title,
        price,
        rating,
        image,
        category,
      },
    });
    setDisableButton(!disableButton);
  };

  return (
    <Card className="m-8 shadow-lg flex flex-col cursor-pointer">
      <div className="p-2">
        <div className="flex  py-1 justify-between items-center">
          <p className="text-sm capitalize font-extrabold">{category}</p>

          <p className="text-sm text-white bg-blue-400 rounded-full p-1 font-semibold">
            {rating.rate}⭐
          </p>
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
        {!disableButton ? (
          <button
            onClick={addToCart}
            className="text-sm font-bold flex text-white bg-black p-1 rounded"
          >
            Add To cart
          </button>
        ) : (
          <button
            className="text-sm font-bold flex  text-white bg-gray-500 p-1 rounded"
            disabled={true}
          >
            Added!
          </button>
        )}
      </CardActions>
    </Card>
  );
}
