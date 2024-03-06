"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type Book = {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
};

export function BookSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const { data: books } = api.book.search.useQuery(
    { searchTerm: debouncedSearchTerm },
    {
      enabled: debouncedSearchTerm.length > 2,
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {books && (
        <div className="absolute z-10 w-full rounded-md pt-2 shadow-lg">
          <ScrollArea className="rounded-md bg-white pb-1">
            <div className="">
              {books.map((book: Book, index: number) => (
                <React.Fragment key={book.id}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex gap-4 text-sm hover:bg-slate-200">
                          {book.imageUrl ? (
                            <Image
                              className="h-100 w-10"
                              width={100}
                              height={1000}
                              src={book.imageUrl}
                              alt={book.title}
                            />
                          ) : (
                            <div className="h-100 flex w-10 items-center justify-center bg-gray-200 text-gray-500">
                              No Image
                            </div>
                          )}
                          <div className="flex flex-col justify-center gap-1">
                            <div className="text-xl">
                              {truncateText(book.title, 30)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {truncateText(book.author, 20)}
                            </div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{book.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {index !== books.length - 1 && <Separator className="my-1" />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
}
