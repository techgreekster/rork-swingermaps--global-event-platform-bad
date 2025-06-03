import { publicProcedure } from "@/backend/trpc/create-context";
import { mockEvents } from "@/mocks/events";

export default publicProcedure.query(() => {
  return mockEvents;
});