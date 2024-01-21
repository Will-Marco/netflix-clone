"use client";

import { Common, Loader, Login, ManageAccount } from "@/components/shared";
import { useGlobalContext } from "@/hook";
import {
  getFavorites,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "@/lib/api";
import { FavouriteProps, MovieDataProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [moviesData, setMoviesData] = useState<MovieDataProps[]>([]);
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const { data: session }: any = useSession();

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const [
          trendingTv,
          topRatedTv,
          popularTv,
          trendingMovie,
          topRatedMovie,
          popularMovie,
          favourites,
        ] = await Promise.all([
          getTrendingMovies("tv"),
          getTopRatedMovies("tv"),
          getPopularMovies("tv"),

          getTrendingMovies("movie"),
          getTopRatedMovies("movie"),
          getPopularMovies("movie"),

          getFavorites(session?.user?.uid, account?._id),
        ]);

        const tvShows: MovieDataProps[] = [
          { title: "Trending TV Shows", data: trendingTv },
          { title: "Top Rated TV Shows", data: topRatedTv },
          { title: "Popular TV Shows", data: popularTv },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "tv",
            addedToFavorites: false,
          })),
        }));

        const moviesShows: MovieDataProps[] = [
          { title: "Trending Movies", data: trendingMovie },
          { title: "Top Rated Movies", data: topRatedMovie },
          { title: "Popular Movies", data: popularMovie },
        ].map((item) => ({
          ...item,
          data: item.data.map((movie: MovieProps) => ({
            ...movie,
            type: "movie",
            addedToFavorites: false,
          })),
        }));

        const allMovies = [...moviesShows, ...tvShows];
        setMoviesData(allMovies);
      } catch (error) {
      } finally {
        setPageLoader(false);
      }
    };

    getAllMovies();
  }, [session]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return <Common moviesData={moviesData} />;
};

export default Page;
