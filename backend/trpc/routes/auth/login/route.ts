import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { mockUsers } from "@/mocks/users";

export default publicProcedure
  .input(z.object({ 
    email: z.string().email(),
    password: z.string()
  }))
  .mutation(async ({ input }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = mockUsers.find(u => u.email === input.email);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    // In a real app, you would verify the password here
    
    return {
      user,
      token: "mock-jwt-token"
    };
  });