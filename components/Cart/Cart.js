import { useStateValue } from "../../context-api/StateProvider";
import { getCartTotal } from "../../context-api/reducer";
import CheckoutProduct from "../../components/CheckoutProducts/CheckoutProducts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, IconButton } from "@mui/material";

const Cart = ({ setOpen }) => {
  const [{ cart }] = useStateValue();

  return (
    <div className="md:w-[500px] ">
      <IconButton onClick={() => setOpen(false)} className="md:hidden">
        <ArrowBackIcon />
      </IconButton>
      <div className="flex bg-gray-100 flex-col shadow-md items-center">
        <div className="flex w-full justify-between p-2 font-mono text-gray-700 font-bold ">
          <p>
            {cart?.length} {cart?.length <= 1 ? "Item" : "Items"}
          </p>
          <h3>Total: ${Math.floor(getCartTotal(cart))}</h3>
        </div>
        <Button
          className="text-sm m-2 mx-auto"
          color="primary"
          variant="contained"
        >
          Proceed to Checkout
        </Button>
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
    </div>
  );
};

export default Cart;
