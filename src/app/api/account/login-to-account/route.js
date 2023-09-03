import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";


export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();

        //login to your account - we want to check if the user is entering the pin whether the pin is correct or not
        const { pin, accountId, uid } = await req.json();

        //check if whether the current user is exist or not
        const getCurrentAccount = await Account.findOne({ _id: accountId, uid });

        if (!getCurrentAccount) {
            return NextResponse.json({
                success: false,
                message: "Account not found",
            });
        }

        const checkPin = await compare(pin, getCurrentAccount.pin);

        if (checkPin) {
            return NextResponse.json({
                success: true,
                message: "Welcome to Netflix!",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect PIN ! Please try again",
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