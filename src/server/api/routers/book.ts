import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ name: z.string().min(3) }))
    .mutation(({ input }) => {
      console.log("Looking for: ", input.name);
      return {};
    }),
});
