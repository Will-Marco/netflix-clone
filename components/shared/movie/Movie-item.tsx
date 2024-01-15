import { MovieProps } from "@/types";
import { motion } from "framer-motion";
import { CheckIcon, ChevronDown, PlusIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  movie: MovieProps;
}

export default function MovieItem({ movie }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="cardWrapper h-28 md:h-36 min-w-[180px] md:min-w-[260px] relative cursor-pointer transform transition duration-500 hover:scale-110 hover:z-[999]">
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt="Media"
          fill
          className=" object-cover rounded-sm md:rounded hover:rounded-sm"
        />

        <div className="p-2 bottom-0 space-x-3 hidden absolute buttonWrapper">
          <button className="p-2 flex items-center gap-x-2 bg-black opacity-75 text-black text-sm font-semibold border border-white rounded-full  transition hover:opacity-90 cursor-pointer">
            {movie?.addedToFavorites ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button className="p-2 flex items-center gap-x-2 bg-black opacity-75 text-black text-sm font-semibold border border-white rounded-full  transition hover:opacity-90 cursor-pointer">
            <ChevronDown color="#fff" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
