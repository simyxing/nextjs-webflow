"use client";

import { useQuery } from "@tanstack/react-query";

const fetchBooks = async () => {
  try {
    const res = await fetch("/api");
    // return await res.json();


    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.API_TOKEN,
      },
    };

    const data = await fetch(
      `/api`
    );

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
   return await data.json()

  } catch (error) {
    throw new Error ('Failed to get data')
  }
};

export default function Page() {
  //https://medium.com/@ecarina.gonzalez/react-query-integration-with-next-js-are-you-ready-7433568356f2
  const { data: books, isLoading, isError, error } = useQuery({
    queryFn: async () => await fetchBooks(),
    queryKey: ["books"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(books, error);
  return (
    <div>
      <h1>Books</h1>
        <div>
                {books.items.map((book:any) => (
          <li key={book.id}>
            {book.fieldData.name} by {book.fieldData.author}
          </li>
        ))}
        </div>
  
    </div>
  );
}


