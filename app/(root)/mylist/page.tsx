"use client";

import { Loader, Login, ManageAccount } from "@/components/shared";
import Banner from "@/components/shared/Banner";
import MovieItem from "@/components/shared/movie/Movie-item";
import Navbar from "@/components/shared/navbar";
import { toast } from "@/components/ui/use-toast";
import { useGlobalContext } from "@/hook";
import { getFavorites } from "@/lib/api";
import { FavouriteProps, MovieProps } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyList() {
  const [favourites, setFavourites] = useState<FavouriteProps[]>([]);

  const { data: session }: any = useSession();
  const { account, pageLoader, setPageLoader } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getFavorites(session?.user?.uid, account?._id);       
        setFavourites(data);
      } catch (error) {
        return toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive",
        });
      } finally {
        setPageLoader(false);
      }
    };

    if (session && account) {
      getData();
    }
  }, [session, account]);

  if (session === null) return <Login />;
  if (account === null) return <ManageAccount />;
  if (pageLoader) return <Loader />;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="md:px-12 px-4">
        {favourites && favourites.length === 0 ? (
          <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
              <div className="relative">
                <div className="">
                  <h1 className="my-2 font-bold text-2xl text-gray-100">
                    Looks like you don&lsquo;t have any favourites yet!
                  </h1>
                  <p className="my-2 text-gray-300">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                  </p>
                  <button
                    className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
                    onClick={() => {
                      setPageLoader(true);
                      router.push("/");
                    }}
                  >
                    Take me there!
                  </button>
                </div>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
          </div>
        ) : (
          <>
            {/* @ts-ignore */}
            <Banner movies={favourites} />
            <div className="h-40 px-4 space-y-0.5 md:space-y-2 ">
              <h2 className="md:text-2xl text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 cursor-pointer hover:text-white ">
                My list
              </h2>

              <div className="md:-ml-2 pb-12 group relative">
                <div className={"grid grid-cols-5 gap-4"}>
                  {favourites &&
                    favourites.map((fav: FavouriteProps) => (
                      <MovieItem
                        key={fav.movieId}
                        movie={
                          {
                            backdrop_path: fav.backdrop_path,
                            poster_path: fav.poster_path,
                            id: +fav.movieId as number,
                            type: fav.type,
                            title: fav.title,
                            overview: fav.overview,
                          } as MovieProps
                        }
                        favouriteId={fav?._id}
                        setFavourites={setFavourites}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
