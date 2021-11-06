import NewsCard from "../NewsCard/NewsCard";

const API_KEY = process.env.NEWS_APIKEY;

const NewsContainer = ({ results }) => {
  console.log(results);
  return (
    <div>
      <NewsCard />
    </div>
  );
};

export default NewsContainer;

// fetching news data from am api
export const getServerSideProps = async () => {
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      results: results,
    },
  };
};
