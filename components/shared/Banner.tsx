"use client";

import { useGlobalContext } from "@/hook";
import { MovieProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  movies: MovieProps[];
}

export default function Banner({ movies }: Props) {
  const [randomMovie, setRandomMovie] = useState<MovieProps | null>(null);
  const { setOpen, setMovie } = useGlobalContext();

  const onHandlerPopup = () => {
    setMovie(randomMovie);
    setOpen(true);
  };

  useEffect(() => {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    setRandomMovie(movie);
  }, []);

  return (
    <div className="lg:h-[65vh] py-16 lg:pb-12 lg:pl-24 flex flex-col lg:justify-end space-y-2 md:space-y-4 ">
      <div className="w-full h-[95vh] absolute top-0 left-0 -z-10">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${
            randomMovie?.backdrop_path || randomMovie?.poster_path
          }`}
          alt={"Banner"}
          fill
          objectFit={"cover"}
        />
        <hr className="w-full h-56 absolute bottom-0 bg-gradient-to-t from-white to-transparent border-none" />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold line-clamp-1">
        {randomMovie?.title || randomMovie?.name || randomMovie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs md:text-lg text-shadow-md line-clamp-3">
        {randomMovie?.overview}
      </p>
      <div className="flex space-x-3">
        <button
          className="px-5 md:px-8 py-1.5 md:py-2.5 flex items-center gap-x-2 bg-white rounded-lg text-sm md:text-xl text-black font-semibold transition hover:opacity-75 cursor-pointer "
          onClick={onHandlerPopup}
        >
          <AiFillPlayCircle className="w-4 md:w-7 h-4 md:h-7" />
          Play
        </button>
        <button
          className="px-5 md:px-8 py-1.5 md:py-2.5 flex items-center gap-x-2 bg-[gray]/70 rounded-lg text-sm md:text-xl font-semibold transition hover:opacity-75 cursor-pointer "
          onClick={onHandlerPopup}
        >
          <IoMdInformationCircleOutline className="h-5 md:h-8 w-5 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
}
