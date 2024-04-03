import {TicketsRepository} from "../domain/TicketsRepository.tsx";
import {Callback, headers, MOBILE_SERVER_URL} from "../../core/utils/api/ApiUtils.ts";
import {TicketBody} from "../model/TicketsModel.tsx";
import Toaster from "../../core/utils/toaster/Toaster.tsx";

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
      Toaster({type: 'success', title: "Feedbacks.Create.Success"});

    } catch (error: any) {
      callback.onFailure(`An error occurred while creating a ticket ${error}`);
      Toaster({type: 'error', title: "Feedbacks.Create.Fail"});
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
      Toaster({type: 'success', title: "Feedbacks.Delete.Success"});
    } catch (error: any) {
      callback.onFailure(`An error occurred while deleting a ticket ${error}`);
      Toaster({type: 'error', title: "Feedbacks.Delete.Fail"});
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
      Toaster({type: 'success', title: "Feedbacks.Update.Success"});
    } catch (error: any) {
      callback.onFailure(`An error occurred while updating a ticket ${error}`);
      Toaster({type: 'error', title: "Feedbacks.Update.Fail"});
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