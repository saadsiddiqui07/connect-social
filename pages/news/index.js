import Head from "next/head";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import NewsCard from "../../components/NewsCard/NewsCard";

const API_KEY = process.env.NEWS_APIKEY;

const News = ({results}) => {
  console.log(results);
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
      <div className="px-5 bg-blue-400 center-center justify-center sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex flex-wrap justify-center">
        {results.map((result) => (
          <NewsCard
            author={result.author}
            title={result.title}
            content={result.content}
            date={result.publishedAt}
            image={result.urlToImage}
          />
        ))}
      </div>
    </div>
  );
};

export default News;

export const getServerSideProps = async () => {
  const results = await fetch(
    `https://newsapi.org/v2/everything?q=apple&from=2021-10-26&to=2021-10-26&sortBy=popularity&apiKey=${API_KEY}`
  )
    .then((data) => data.json())
    .catch((err) => console.log(err.message));

  return {
    props: {
      results: results.articles,
    },
  };
};
