// app/api/route.js 👈🏽
import { WebflowClient, Webflow } from "webflow-api";
import { NextResponse } from "next/server";

const webflow = new WebflowClient({
  accessToken: process.env.API_TOKEN ?? "",
});

// REFER: https://stackoverflow.com/a/75418737
// To handle a GET request to /api
export async function GET(request: any) {
  // Do whatever you want

  if (!process.env.SITE_ID) {
    return NextResponse.json({ message: "Site ID not found" }, { status: 400 });
  }
  try {
    const collections = await webflow.collections.list(process.env.SITE_ID);
    console.log(process.env.SITE_ID);
    console.log(collections);
    return NextResponse.json(
      { message: collections.collections?.length },
      { status: 400 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: e }, { status: 400 });
  }

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: any) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
