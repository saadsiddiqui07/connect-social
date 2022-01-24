import { useStateValue } from "../../context-api/StateProvider";
import CloseIcon from "@mui/icons-material/Close";
import { Card, CardActions, CardContent, Button } from "@mui/material";

const CheckoutProduct = ({ id, title, price, image, category }) => {
  const [{}, dispatch] = useStateValue();

  // remove a product from cart
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
        <Button
          onClick={removeFromCart}
          variant="contained"
          color="error"
          endIcon={<CloseIcon />}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CheckoutProduct;
