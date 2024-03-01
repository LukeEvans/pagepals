"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

// TODO Add debounce
export function BookSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: books } = api.book.search.useQuery(
    { searchTerm },
    {
      enabled: searchTerm.length > 2,
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {books && (
        <div className="absolute z-10 w-full rounded-md pt-2 shadow-lg">
          <ScrollArea className="rounded-md bg-white pb-1">
            <div className="">
              {books.map((book, index) => (
                <>
                  <div
                    key={book.id}
                    className="flex gap-4 text-sm hover:bg-slate-200"
                  >
                    {/* Show an image not found if no imageUrl */}
                    <Image
                      className="h-100 w-10"
                      width={100}
                      height={1000}
                      src={book.imageUrl}
                      alt={book.title}
                    />
                    {/* Show a truncated title and author*/}
                    <div className="flex flex-col justify-center gap-1">
                      <div className="text-xl">{book.title}</div>
                      <div className="text-sm text-gray-600">{book.author}</div>
                    </div>
                  </div>
                  {index !== books.length - 1 && <Separator className="my-1" />}
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
