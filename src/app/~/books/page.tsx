"use client";

import { useQuery } from "@tanstack/react-query";

const fetchBooks = async () => {
  try {
    const res = await fetch("/api");
    console.log(await res.json(), 'GUHIUHGCHVJKHGGYHUJIKOIKJUHGF');
    return await res.json();
  } catch (error) {
    throw e;
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
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}
