import { MovieProps } from "@/types";
import React from "react";
import MovieItem from "./Movie-item";

interface Props {
  title: string;
  data: MovieProps[];
}

export default function MovieRow({ title, data }: Props) {
  return (
    <div className={"h-40 px-4 space-y-0.5 md:space-y-2"}>
      <h2 className="text-sm md:text-2xl font-semibold text-[#e5e5e5] cursor-pointer transition-colors duration-200 hover:text-white">
        {title}
      </h2>

      <div className={"md:-ml-2 group relative"}>
        <div
          className={
            "movie-row md:p-2 flex items-center space-x-0.5 md:space-x-2.5 overflow-x-scroll"
          }
        >
          {data &&
            data
              .filter(
                (item) =>
                  item.backdrop_path !== null && item.poster_path !== null
              )
              .map((movie) => <MovieItem key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
}
