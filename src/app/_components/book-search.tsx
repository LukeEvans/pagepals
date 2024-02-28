"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import Image from "next/image";

export function BookSearch() {
  const [name, setName] = useState("");

  const { data: books } = api.book.search.useQuery(
    { name },
    {
      enabled: name.length > 2,
    },
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2"
      >
        <Input
          placeholder="Find your next book"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      <ul className="mt-4">
        {books?.results?.map((book) => (
          <li key={book.id} className="mb-2 flex items-center gap-4">
            <Image
              className="h-30 w-20 object-cover"
              width={500}
              height={500}
              src={book.imageUrl}
              alt={book.title}
            />
            <div>
              <div>{book.title}</div>
              <div className="text-sm text-gray-600">{book.author}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
