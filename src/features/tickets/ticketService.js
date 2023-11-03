import axios from "axios";

const API_URL = "/api/tickets/";

//create ticket

const createTicket = async(ticketData, token)=>{

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
      },
    };

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

//get uset tickets
const getTickets = async( token)=>{

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
      },
    };

    const response = await axios.get(API_URL,  config)

    return response.data
}

//get a specific user ticket
const getTicket = async(ticketId, token)=>{

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
      },
    };

    const response = await axios.get(API_URL + ticketId,  config)

    return response.data
}

//let a user close a ticket
const closeTicket = async(ticketId, token)=>{

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
      },
    };

    const response = await axios.put(API_URL + ticketId, {status: 'closed'} , config)

    return response.data
}
const ticketService ={
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}

export default ticketService