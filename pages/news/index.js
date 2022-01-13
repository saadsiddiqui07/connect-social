import Head from "next/head";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import NewsCard from "../../components/NewsCard/NewsCard";

const API_KEY = process.env.NEWS_APIKEY;

const News = ({ results }) => {
  return (
    <div>
      <Head>
        <title>Connect: News</title>
        <meta name="News" content="Socialize in a better way" />
      </Head>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <div className="px-5 pt-5 bg-gray-100 center-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {results.map((result) => (
          <NewsCard
            key={result.id}
            image={result.urlToImage}
            {...result}
          />
        ))}
      </div>
    </div>
  );
};

export default News;

export const getServerSideProps = async () => {
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`
  )
    .then((data) => data.json())
    .catch((err) => console.log(err.message));

  return {
    props: {
      results: results.articles,
    },
  };
};
