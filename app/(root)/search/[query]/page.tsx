"use client";

import { Loader, Login, ManageAccount } from "@/components/shared";
import { useGlobalContext } from "@/hook";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { getSearchResults } from "@/lib/api";
import { MovieProps } from "@/types";
import MovieItem from "@/components/shared/movie/Movie-item";

export default function Page() {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const { data: session }: any = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const [tv, movies] = await Promise.all([
          getSearchResults("tv", params.query as string),
          getSearchResults("movie", params.query as string),
        ]);

        const tvShows = tv
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movie: MovieProps) => ({ ...movie, type: "tv" }));

        const moviesShows = movies
          .filter(
            (item: MovieProps) =>
              item.backdrop_path !== null && item.poster_path !== null
          )
          .map((movie: MovieProps) => ({ ...movie, type: "movie" }));

        setMovies([...tvShows, ...moviesShows]);
      } catch (error) {
        return toast({
          title: "Error",
          description: "Oops! couldn't find data",
          variant: "destructive",
        });
      } finally {
        setPageLoader(false);
      }
    };

    getData();
  }, []);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />
      <div className="mt-[100px] px-4 space-y-0.5 md:space-y-2">
        <h2 className="text-sm md:text-2xl font-semibold text-[#e5e5e5] transition-colors duration-200 cursor-pointer hover:text-white">
          Showing Results for {decodeURI(params.query as string)}
        </h2>
        <div className="md:p-2 grid grid-cols-5 gap-3 items-center scrollbar-hide">
          {movies && movies.length ? (
            movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
          ) : (
            <h4 className="text-sm md:text-xl font-semibold text-red-600 transition-colors duration-200">
              Sorry, no search results were found :(
            </h4>
          )}
        </div>
      </div>
    </motion.div>
  );
}
