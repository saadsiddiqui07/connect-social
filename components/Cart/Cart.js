import { useStateValue } from "../../context-api/StateProvider";
import { getCartTotal } from "../../context-api/reducer";
import CheckoutProduct from "../../components/CheckoutProducts/CheckoutProducts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";

const Cart = ({ setOpen }) => {
  const [{ cart }, dispatch] = useStateValue();

  // empty the total cart
  const handleEmptyCart = () => {
    dispatch({
      type: "EMPTY_CART",
    });
    setOpen(false);
  };

  return (
    <div className="w-full md:w-[500px]">
      <div className="flex items-center px-2">
        <IconButton onClick={() => setOpen(false)} className="">
          <ArrowBackIcon />
        </IconButton>
        <p className="ml-4 font-bold text-lg">Cart</p>
      </div>
      <div className="flex flex-col items-center">
        {cart?.map((product) => (
          <CheckoutProduct
            key={product.id}
            id={product.id}
            {...product}
            setOpen={setOpen}
          />
        ))}
      </div>

      <div className="flex bg-gray-100 flex-col shadow-md items-center">
        <div className="flex w-full justify-between p-2 font-mono text-gray-700 font-bold ">
          <p>
            {cart?.length} {cart?.length <= 1 ? "Item" : "Items"}
          </p>
          <h3>Total: ${Math.floor(getCartTotal(cart))}</h3>
        </div>
        <div className="flex items-center justify-around mx-2 w-full">
          <Button
            className="text-sm m-2 mx-auto"
            color="primary"
            variant="contained"
          >
            Proceed to Checkout
          </Button>
          <button
            className="bg-black text-white font-mono p-1 rounded"
            onClick={handleEmptyCart}
          >
            Empty cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
