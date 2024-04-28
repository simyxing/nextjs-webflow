// app/api/route.js 👈🏽
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

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    };

    const data = await fetch(
      `https://api.webflow.com/v2/collections/662b431bea4123556ea003ee/items`,
      options
    );

    const parsedData = await data.json();

    return NextResponse.json(parsedData, { status: 400 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}

// To handle a POST request to /api
export async function POST(request: any) {
  const data = await request.json();

  try {
    const url =
      "https://api.webflow.com/v2/collections/662b431bea4123556ea003ee/items";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
      body: JSON.stringify({
        isArchived: false,
        isDraft: false,
        fieldData: {
          name: data.bookName,
          author: data.bookAuthor,
        },
      }),
    };

    const res = await fetch(url, options);
    return NextResponse.json({ message: "New item created" }, { status: 200 });
  } catch (error) {
    console.log(error);
    // Do whatever you want
    return NextResponse.json(
      { message: "Error creating new item" },
      { status: 500 }
    );
  }
}

// Same logic to add a `PATCH`, `DELETE`...
