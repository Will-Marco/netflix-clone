import { useGlobalContext } from "@/hook";
import { FavouriteProps, MovieProps } from "@/types";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, MinusIcon, PlusIcon } from "lucide-react";
import CustomImage from "../Custom-image";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  movie: MovieProps;
  favouriteId?: string;
  setFavourites?: Dispatch<SetStateAction<FavouriteProps[]>>;
}

export default function MovieItem({
  movie,
  favouriteId = "",
  setFavourites,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpen, setMovie, account } = useGlobalContext();
  const { data: session }: any = useSession();


  const onHandlePopup = () => {
    setMovie(movie);
    setOpen(true);
  };

  const onAdd = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/favourite", {
        uid: session?.user?.uid,
        accountId: account?._id,
        backdrop_path: movie?.backdrop_path,
        poster_path: movie?.poster_path,
        movieId: movie?.id,
        type: movie?.type,
        title: movie?.title || movie?.name,
        overview: movie?.overview,
      });

      if (data.success) {
        return toast({
          title: "Success",
          description: "Movie added to your favourite list",
        });
      } else {
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/favourite?id=${favouriteId}`);

      if (data?.success) {
        if (setFavourites) {
          setFavourites((prev: FavouriteProps[]) =>
            prev.filter((item: FavouriteProps) => item._id !== favouriteId)
          );
        }
        return toast({
          title: "Success",
          description: "The Movie removed from your favourite list",
        });
      } else {
        return toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <CustomImage
          image={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${
            movie?.backdrop_path || movie?.poster_path
          }`}
          alt="Media"
          className="rounded-sm md:rounded hover:rounded-sm"
          onClick={onHandlePopup}
        />

        <div className="p-2 bottom-0 space-x-3 hidden absolute buttonWrapper">
          <button className="p-2 flex items-center gap-x-2 bg-black opacity-75 text-black text-sm font-semibold border border-white rounded-full  transition hover:opacity-90 cursor-pointer">
            {isLoading ? (
              <Loader2 color="#ffffff" className="h-7 w-7 animate-spin" />
            ) : favouriteId?.length ? (
              <MinusIcon
                color="#ffffff"
                className="h-7 w-7"
                onClick={onRemove}
              />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" onClick={onAdd} />
            )}
          </button>
          <button className="p-2 flex items-center gap-x-2 bg-black opacity-75 text-black text-sm font-semibold border border-white rounded-full  transition hover:opacity-90 cursor-pointer">
            <ChevronDown
              color="#fff"
              className="h-7 w-7"
              onClick={onHandlePopup}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
