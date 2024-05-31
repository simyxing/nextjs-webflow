"use client";

import { useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";

const fetchBooks = async () => {
  try {
    const data = await fetch(`/api`);

    return await data.json();
  } catch (error) {
    throw new Error("Failed to get data");
  }
};

export default function Page() {
  //https://medium.com/@ecarina.gonzalez/react-query-integration-with-next-js-are-you-ready-7433568356f2
  const { data: books, isLoading, isError, error } = useQuery({
    queryFn: async () => await fetchBooks(),
    queryKey: ["books"],
  });

  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  //create
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch("/api", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        bookName: bookName,
        bookAuthor: bookAuthor,
      }),
    });

    const response = await res.json();
    console.log(response);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Books</h1>
      <div>
        {books.items.map((book: any) => (
          <li key={book.id}>
            {book.fieldData.name} by {book.fieldData.author}
          </li>
        ))}
      </div>
      <br />
      <h1>Add Book</h1>
      <form onSubmit={onSubmit}>
        <label>Book Name</label>&nbsp;
        <input
          type="text"
          name="name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <br />
        <label>Author Name</label>&nbsp;
        <input
          type="text"
          name="author"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
