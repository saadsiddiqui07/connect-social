import { useState } from "react";
import { Card, CardActions, CardContent } from "@mui/material";
import { useStateValue } from "../../context-api/StateProvider";

const Product = ({ id, image, price, title, rating, category, setOpen }) => {
  const [{}, dispatch] = useStateValue();
  const [disableButton, setDisableButton] = useState(false);

  // add a product to cart
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
    setOpen(true);
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
};

export default Product;
