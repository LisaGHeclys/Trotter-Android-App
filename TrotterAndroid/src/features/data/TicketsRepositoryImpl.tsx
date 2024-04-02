import {TicketsRepository} from "../domain/TicketsRepository.tsx";
import {Callback, headers, MOBILE_SERVER_URL} from "../../core/utils/api/ApiUtils.ts";
import {TicketBody} from "../model/TicketsModel.tsx";

class TicketsRepositoryImpl implements TicketsRepository {
  async createTicket(token: string, ticketBody: TicketBody, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/ticket`, {
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: ticketBody.userID,
          title: ticketBody.title,
          contactEmail: ticketBody.contactEmail,
          category: ticketBody.category,
          description: ticketBody.description,
          status: ticketBody?.status,
          messages: ticketBody?.messages,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while creating a ticket ${error}`);
      //toSetup Toaster for mobile
    }
  }

  async deleteTicket(token: string, id: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/ticket/all/${id}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while deleting a ticket ${error}`);
      //toSetup Toaster for mobile
    }
  }

  async updateTicket(token: string, id: string, ticketBody: TicketBody, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/ticket/all/${id}`, {
        method: 'PATCH',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: ticketBody.userID,
          title: ticketBody.title,
          contactEmail: ticketBody.contactEmail,
          category: ticketBody.category,
          description: ticketBody.description,
          status: ticketBody?.status,
          messages: ticketBody?.messages,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while updating a ticket ${error}`);
      //toSetup Toaster for mobile
    }
  }

  async getOneTicket(token: string, ticketBody: TicketBody, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/ticket/all`, {
        method: 'GET',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: ticketBody.userID,
          title: ticketBody.title,
          contactEmail: ticketBody.contactEmail,
          category: ticketBody.category,
          description: ticketBody.description,
          status: ticketBody?.status,
          messages: ticketBody?.messages,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while getting one ticket ${error}`);
    }
  }

  async getAllTickets(token: string, ticketBody: TicketBody, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/ticket/all`, {
        method: 'GET',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userID: ticketBody.userID,
          title: ticketBody.title,
          contactEmail: ticketBody.contactEmail,
          category: ticketBody.category,
          description: ticketBody.description,
          status: ticketBody?.status,
          messages: ticketBody?.messages,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while getting all of the tickets ${error}`);
    }
  }
}

export default new TicketsRepositoryImpl();