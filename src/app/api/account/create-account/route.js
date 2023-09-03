import connectToDB from "@/src/database";
import Account from "@/src/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();

        const { name, pin, uid } = await req.json();

        const isAccountAlreadyExists = await Account.find({ uid, name });
        console.log(isAccountAlreadyExists);
        const allAccounts = await Account.find({});
        if (isAccountAlreadyExists && isAccountAlreadyExists.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Please try with a different name",
            });
        }

        if (allAccounts && allAccounts.length === 4) {
            return NextResponse.json({
                success: false,
                message: "You can only add max 4 accounts",
            });
        }

        const hashPin = await hash(pin, 12);

        const newlyCreatedAccount = await Account.create({
            name,
            pin: hashPin,
            uid,
        });

        if (newlyCreatedAccount) {
            return NextResponse.json({
                success: true,
                message: "Account created successfully",
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