import { MovieDataProps } from "@/types";
import Navbar from "./navbar";

interface Props {
  moviesData: MovieDataProps[];
}

export default function Common({ moviesData }: Props) {

  return (
    <main>
      <Navbar />
    </main>
  );
}
