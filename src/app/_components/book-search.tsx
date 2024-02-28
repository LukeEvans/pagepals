"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function BookSearch() {
  const [name, setName] = useState("");

  const bookSearch = api.book.search.useMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        bookSearch.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <Input
        placeholder="Find your next book"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" disabled={bookSearch.isLoading}>
        {bookSearch.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
