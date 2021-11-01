import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

const News = () => {
  return (
    <div>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <h1>News page</h1>
    </div>
  );
};

export default News;
