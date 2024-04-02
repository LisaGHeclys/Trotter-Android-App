import {Callback} from "../../core/utils/api/ApiUtils.ts";
import {TicketBody} from "../model/TicketsModel.tsx";

export interface TicketsRepository {
  createTicket: (token: string, ticketBody: TicketBody, callback: Callback) => void;
  deleteTicket: (token: string, id: string, callback: Callback) => void;
  updateTicket: (token: string, id: string, ticketBody: TicketBody, callback: Callback) => void;
  getOneTicket: (token: string, ticketBody: TicketBody, callback: Callback) => void;
  getAllTickets: (token: string, ticketBody: TicketBody, callback: Callback) => void;
}