export enum TicketCategory {
  trips = "trips",
  event = "event",
  account = "account",
  feedback = "feedback",
  other = "other",
}

export enum TicketStatus {
  open = "open",
  pending = "pending",
  stuck = "stuck",
  closed = "closed",
}

export type TicketCategoryParams = {
  name: string,
  id: TicketCategory,
}

export type TicketBody = {
  userID: string,
  title: string,
  contactEmail: string,
  category: TicketCategory,
  description: string,
  status?: TicketStatus,
  messages?: string,
}