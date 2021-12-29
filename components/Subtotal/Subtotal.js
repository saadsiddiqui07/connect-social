import { useStateValue } from "../../context-api/StateProvider";
import { getCartTotal } from "../../context-api/reducer";

const Subtotal = () => {
  const [{ cart }] = useStateValue();

  return (
    <div className="bg-gray-500 shadow-lg text-white w-full my-3">
      {cart?.length > 0 && (
        <>
          <div className="flex items-center justify-between px-3 py-2">
            <h5 className="font-bold">Price: ({cart?.length})</h5>
            <h4>Total: ${Math.floor(getCartTotal(cart))}</h4>
          </div>
          <button className="flex ml-auto mr-auto py-1 px-1 my-2 bg-green-500 rounded font-bold">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Subtotal;
