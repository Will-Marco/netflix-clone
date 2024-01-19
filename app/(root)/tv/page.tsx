"use client";

import { Common, Loader, Login, ManageAccount } from "@/components/shared";
import { useGlobalContext } from "@/hook";
import { getMoviesByGenre } from "@/lib/api";
import { MovieDataProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);

  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session } = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          action,
          animation,
          comedy,
          crime,
          documentary,
          drama,
          family,
          war,
        ] = await Promise.all([
          getMoviesByGenre("tv", 10759),
          getMoviesByGenre("tv", 16),
          getMoviesByGenre("tv", 35),
          getMoviesByGenre("tv", 80),
          getMoviesByGenre("tv", 99),
          getMoviesByGenre("tv", 18),
          getMoviesByGenre("tv", 10751),
          getMoviesByGenre("tv", 10768),
        ]);

        const allResult: MovieDataProps[] = [
          { title: "Action", data: action },
          { title: "Animation", data: animation },
          { title: "Comedy", data: comedy },
          { title: "Crime", data: crime },
          { title: "Documentary", data: documentary },
          { title: "Drama", data: drama },
          { title: "Family", data: family },
          { title: "War", data: war },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "movie",
            addedToFavorites: false,
          })),
        }));
        console.log(allResult);

        setMoviesData(allResult);
      } catch (error) {
        console.log(error);
      } finally {
        setPageLoader(false);
      }
    };
    getAllMovies();
  }, []);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData} />;
}
