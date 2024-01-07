import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Account from "@/database/account";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";

// Create a new account

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, pin, uid } = await req.json();

    const isExist = await Account.findOne({ name });
    const allAccounts = await Account.find({ uid });

    if (isExist) {
      return NextResponse.json({
        success: false,
        message: "You already have an account",
      });
    }

    if (allAccounts && allAccounts.length === 4) {
      return NextResponse.json({
        success: false,
        message: "You can only have 4 accounts",
      });
    }

    const hashPin = await hash(pin, 10);

    const account = await Account.create({ name, pin: hashPin, uid });

    return NextResponse.json({ account });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + e,
    });
  }
}

// Get all accounts

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({
        success: false,
        message: "Account ID is not found",
      });
    }

    const accounts = await Account.findOne({ uid });

    return NextResponse.json({ success: true, accounts });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + error,
    });
  }
}

// Delete an account

export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Account ID is not found",
      });
    }

    await Account.findOneAndDelete({ id });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong\n" + error,
    });
  }
}
