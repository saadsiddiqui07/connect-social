import Head from "next/head";
import Header from "../../components/Header/Header";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import MovieRow from "../../components/MovieRow/MovieRow";
import MovieBanner from "../../components/MovieBanner/MovieBanner";
import requests from "../../utils/requests";

const Movies = () => {
  return (
    <div>
      <Head>
        <title>Connect: Movies</title>
        <meta name="Messages" content="Socialize in a better way" />
      </Head>
      <Header />
      <div className="sm:hidden">
        <MobileHeader />
      </div>
      <MovieBanner />
      <div className="px-5">
        <MovieRow
          title="NETFLIX ORIGINALS"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow
        />
        <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
        <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <MovieRow
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
        />
        <MovieRow
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
        />
      </div>
    </div>
  );
};

export default Movies;
