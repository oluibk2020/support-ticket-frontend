import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import { FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "420px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  //close ticket
  function onTicketClose() {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  }

  //open modal
  function openModal() {
    setModalIsOpen(true);
  }
  //close modal
  function closeModal() {
    setModalIsOpen(false);
  }

  //on note submit
  function onNoteSubmit(e) {
    e.preventDefault();
    dispatch(createNote({noteText, ticketId}))
    closeModal();
  }

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product} </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" ? (
        <button className="btn" onClick={openModal}>
          {" "}
          <FaPlus />
          Add Note
        </button>
      ) : null}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" ? (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      ) : null}
    </div>
  );
}
export default Ticket;
