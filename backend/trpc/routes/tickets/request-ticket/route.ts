import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export default publicProcedure
  .input(z.object({ 
    eventId: z.string(),
    userId: z.string()
  }))
  .mutation(async ({ input }) => {
    // In a real app, this would create a ticket request in the database
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    return {
      success: true,
      message: "Ticket request submitted successfully"
    };
  });