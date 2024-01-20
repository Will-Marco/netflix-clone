"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGlobalContext } from "@/hook";
import { getMovieDetails } from "@/lib/api";
import { MovieDetailsProps } from "@/types";
import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";

export default function MoviePopup() {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps | null>(
    null
  );

  const { open, setOpen, movie } = useGlobalContext();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const extractMovieDetails = await getMovieDetails(
          movie?.type,
          movie?.id
        );
        setMovieDetails(extractMovieDetails);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();
  }, [movie, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"max-w-4xl"}>
        <div className={"w-full h-56 bg-black"}></div>

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
      </DialogContent>
    </Dialog>
  );
}
