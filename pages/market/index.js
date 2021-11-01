import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const MarketPlace = () => {
  return (
    <div>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <h1>market page</h1>
    </div>
  );
};

export default MarketPlace;
