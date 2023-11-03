import axios from "axios";

const API_URL = "/api/tickets/";

//get all user notes for a ticket
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
    },
  };

  const response = await axios.get(API_URL + ticketId + "/notes", config);

  return response.data;
};

//get all user notes for a ticket
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the bearer token
    },
  };

  const response = await axios.post(API_URL + ticketId + "/notes",
  {text: noteText},
  config);

  return response.data;
};

const noteService = {
  getNotes,
  createNote
};

export default noteService;
