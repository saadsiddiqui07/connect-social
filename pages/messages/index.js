import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const Messages = () => {
  return (
    <div>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <h1>Messages page</h1>
    </div>
  );
};

export default Messages;
