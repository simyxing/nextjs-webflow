// app/api/route.js 👈🏽
import { WebflowClient, Webflow } from "webflow-api";
import { NextResponse } from "next/server";

// REFER: https://stackoverflow.com/a/75418737
// To handle a GET request to /api
export async function GET(request: any) {
  // Do whatever you want

  if (!process.env.SITE_ID) {
    return NextResponse.json({ message: "Site ID not found" }, { status: 400 });
  }

  if (!process.env.API_TOKEN) {
    return NextResponse.json(
      { message: "API_TOKEN not found" },
      { status: 400 }
    );
  }
  const webflow = new WebflowClient({
    accessToken: process.env.API_TOKEN ?? "",
  });

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    };

    const data = await fetch(
      `https://api.webflow.com/v2/collections/COL_ID/items`,
      options
    );

    const jsonData = await data.json();
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log(data, "data hereee");
    // // console.log(data.json());
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log("a");
    // console.log("a");

    // const collections = await webflow.collections.list(process.env.SITE_ID);
    // console.log(process.env.SITE_ID);
    // console.log(collections);
    // return NextResponse.json(
    //   { message: "collection:" + collections.collections?.length },
    //   { status: 400 }
    // );
   const parsedData = await data.json()
   console.log(parsedData.items.map((a) => console.log(a)))
    // console.log(await data.json().items.map());
    // fetch(
    //   "https://api.webflow.com/v2/collections/COL_ID/items",
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((response) => console.log(response))
    //   .catch((err) => console.error(err));

    return NextResponse.json(jsonData, { status: 200 });
  } catch (e) {
    console.log("error here?", e);
    return NextResponse.json({ status: 500 });
  }
}

// To handle a POST request to /api
export async function POST(request: any) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...
