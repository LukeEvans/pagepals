"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export function BookSearch() {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState(false);

  const { data: books } = api.book.search.useQuery(
    { name },
    {
      enabled: name.length > 2,
    },
  );

  return (
    <div className="relative">
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
          onFocus={() => {
            console.log("focus!");
            setFocus(false);
          }}
        />
      </form>
      {books?.results && (
        <div className="absolute z-10 w-full rounded-md pt-1 shadow-lg">
          <ScrollArea className="rounded-md bg-white pb-1">
            <div className="">
              {books.results.map((book, index) => (
                <>
                  <div
                    key={book.id}
                    className="flex gap-4 text-sm hover:bg-slate-200"
                  >
                    <Image
                      className="h-100 w-10"
                      width={0}
                      height={0}
                      src={book.imageUrl}
                      alt={book.title}
                    />
                    <div className="flex flex-col justify-center gap-1">
                      <div className="text-xl">{book.title}</div>
                      <div className="text-sm text-gray-600">{book.author}</div>
                    </div>
                  </div>
                  {index !== books.results.length - 1 && (
                    <Separator className="my-1" />
                  )}
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
