import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import getAllEventsRoute from "./routes/events/get-all/route";
import getEventByIdRoute from "./routes/events/get-by-id/route";
import getUserTicketsRoute from "./routes/tickets/get-user-tickets/route";
import getHostRequestsRoute from "./routes/tickets/get-host-requests/route";
import requestTicketRoute from "./routes/tickets/request-ticket/route";
import loginRoute from "./routes/auth/login/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  events: createTRPCRouter({
    getAll: getAllEventsRoute,
    getById: getEventByIdRoute,
  }),
  tickets: createTRPCRouter({
    getUserTickets: getUserTicketsRoute,
    getHostRequests: getHostRequestsRoute,
    requestTicket: requestTicketRoute,
  }),
  auth: createTRPCRouter({
    login: loginRoute,
  }),
});

export type AppRouter = typeof appRouter;