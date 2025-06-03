import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { mockEvents } from "@/mocks/events";

export default publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const event = mockEvents.find(event => event.id === input.id);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  });