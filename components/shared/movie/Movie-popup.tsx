"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/hook";
import { getMovieDetails, getSimilarMovie } from "@/lib/api";
import { MovieDetailsProps, MovieProps } from "@/types";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ReactStars from "react-stars";
import MovieItem from "./Movie-item";
import { Skeleton } from "@/components/ui/skeleton";

export default function MoviePopup() {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(
    null
  );
  const [similarMovies, setSimilarMovies] = useState<MovieProps[]>([]);
  const [key, setKey] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { open, setOpen, movie } = useGlobalContext();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setIsLoading(true)
        const extractMovieDetails = await getMovieDetails(
          movie?.type,
          movie?.id
        );
        const similarMovie = await getSimilarMovie(movie?.type, movie?.id);
        const results = similarMovie.map((movie: MovieProps[]) => ({
          ...movie,
          type: extractMovieDetails?.type,
          addedToFavorites: false,
        }));

        setMovieDetails(extractMovieDetails?.data);
        setSimilarMovies(results);

        const findIndexOfTrailer = extractMovieDetails?.data?.videos?.results
          ?.length
          ? extractMovieDetails?.data?.videos?.results?.findIndex(
              (item: { type: string }) => item.type === "Trailer"
            )
          : -1;
        const findIndexOfClip = extractMovieDetails?.data?.videos?.results
          ?.length
          ? extractMovieDetails?.data?.videos?.results?.findIndex(
              (item: { type: string }) => item.type === "Clip"
            )
          : -1;
        const key =
          findIndexOfTrailer !== -1
            ? extractMovieDetails?.data?.videos?.results[findIndexOfTrailer]
                ?.key
            : findIndexOfClip !== -1
            ? extractMovieDetails?.data?.videos?.results[findIndexOfClip]?.key
            : null;

        setKey(key);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (movie !== null) {
      getMovie();
    }
  }, [movie]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={
          "max-w-6xl max-h-[90vh] overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-red-600"
        }
      >
        {isLoading ? (
          <>
            <Skeleton className="mt-4 pt-[56.25%]" />
            <Skeleton className="w-1/2 h-8" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="w-1/4 h-6" />

            <div className="p-4 bg-black rounded-md shadow-2xl">
              <Skeleton className="w-1/2 h-6" />
              <div className="mt-5 md:p-2 grid grid-cols-4 items-center gap-3 scrollbar-hide">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
                  <Skeleton className="h-[150px]" key={i} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"mt-4 pt-[56.25%] relative"}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${key}`}
                width={"100%"}
                height={"100%"}
                style={{ position: "absolute", top: "0", left: "0" }}
                playing
                controls
              />
            </div>
            <div className={"flex flex-col space-y-4"}>
              <h1
                className={
                  "text-2xl md:text-4xl lg:text-4xl font-bold line-clamp-1"
                }
              >
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <p className=" text-sm text-slate-500 text-shadow-md">
                {movie?.overview}
              </p>
              <div className={"flex flex-row items-center flex-wrap gap-2"}>
                <ReactStars
                  value={movieDetails?.vote_average}
                  count={10}
                  edit={false}
                  color2={"#e5b109"}
                />
                <p className={"text-[#e5b109]"}>({movieDetails?.vote_count})</p>
                <span className={"text-green-400 font-semibold"}>
                  {movieDetails?.release_date
                    ? movieDetails?.release_date.split("-")[0]
                    : "2023"}
                </span>
                <div className="px-2 inline-flex border-2 border-white/40 text-green-400 font-semibold rounded ">
                  HD
                </div>
              </div>
            </div>
            <div className="p-4 bg-black rounded-md shadow-2xl">
              <h2 className="mt-2 mb-6 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                More Like This
              </h2>
              <div className="md:p-2 grid grid-cols-4 items-center gap-3 scrollbar-hide">
                {similarMovies &&
                  similarMovies.length &&
                  similarMovies
                    .filter(
                      (item) =>
                        item.backdrop_path !== null && item.poster_path !== null
                    )
                    .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
