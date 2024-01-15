import { MovieDataProps } from "@/types";
import Navbar from "./navbar";
import Banner from "./Banner";
import MovieRow from "./movie/Movie-row";

interface Props {
  moviesData: MovieDataProps[];
}

export default function Common({ moviesData }: Props) {
  return (
    <main>
      <Navbar />
      <div className="pl-4 pb-24 lg:space-y-24 relative">
        <Banner movies={moviesData && moviesData[0].data} />
        <section className={"md:space-y-16"}>
          {moviesData &&
            moviesData.map((movie) => (
              <MovieRow
                key={movie.title}
                title={movie.title}
                data={movie.data}
              />
            ))}
        </section>
      </div>
    </main>
  );
}
