import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import searchBooks from "~/server/googleBooks";

export const bookRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ searchTerm: z.string().min(3) }))
    .query(async ({ input }) => {
      // TODO Add rate limit for userId
      console.log("Looking for: ", input.searchTerm);
      return await searchBooks(input.searchTerm);
    }),
});
