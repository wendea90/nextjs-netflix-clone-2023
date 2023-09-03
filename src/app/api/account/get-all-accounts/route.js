import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();

        //first take user id
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        const getAllAccounts = await Account.find({ uid: id });

        //if this get all accounts is true return..
        if (getAllAccounts) {
            return NextResponse.json({
                success: true,
                data: getAllAccounts,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something Went wrong",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something Went wrong",
        });
    }
}


//todo export const dynamic = "force-dynamic";:
// This line exports a constant variable named dynamic with the value "force-dynamic".This variable can be imported and used in other parts of your code.
//todo export async function POST(req) { ... }:
// This line exports an asynchronous function named POST that takes a req object as a parameter.This function is likely an API route handler used in Next.js.API routes in Next.js handle server - side logic for processing HTTP requests.