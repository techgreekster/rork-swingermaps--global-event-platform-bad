import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { mockTickets } from "@/mocks/tickets";

export default publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(({ input }) => {
    return mockTickets.filter(ticket => ticket.userId === input.userId);
  });