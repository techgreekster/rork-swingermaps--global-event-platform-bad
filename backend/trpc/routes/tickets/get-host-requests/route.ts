import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { hostRequests } from "@/mocks/tickets";

export default publicProcedure
  .input(z.object({ hostId: z.string() }))
  .query(({ input }) => {
    // In a real app, this would filter requests by hostId
    return hostRequests;
  });