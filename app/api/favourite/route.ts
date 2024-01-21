import Favourite from "@/database/favourite";
import { connectToDatabase } from "@/lib/mongoose";
import { FavouriteProps } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

console.log(dynamic);

// Post a new favourite

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body: FavouriteProps = await req.json();

    const { uid, accountId, backdrop_path, poster_path, movieId, type } = body;

    const isExist = await Favourite.findOne({ uid, movieId, accountId });

    if (isExist) {
      return NextResponse.json({
        success: true,
        message: "Already added to favorites",
      });
    }

    const favorites = await Favourite.create({
      uid,
      accountId,
      backdrop_path,
      poster_path,
      movieId,
      type,
    });

    return NextResponse.json({ success: true, data: favorites });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + error,
    });
  }
}

// Get all favorites

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");
    const accountId = searchParams.get("accountId");

    const favourites = await Favourite.find({ uid, accountId });

    return NextResponse.json({ success: true, data: favourites });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + error,
    });
  }
}

// Delete a favourite

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Favourite.findByIdAndDelete({ id });

    return NextResponse.json({
      success: true,
      message: "Favourite deleted successfuly",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + error,
    });
  }
}
