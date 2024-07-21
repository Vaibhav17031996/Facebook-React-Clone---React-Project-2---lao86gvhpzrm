import React from "react";
// import "../styles/Modal.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="closeBtn">
          <button onClick={setOpenModal(false)}> X </button>
        </div>
        <div className="title">
          <h1>Vaibhav's profile</h1>
        </div>
        <div className="body">
          <p>Body</p>
        </div>
        <div className="footer">
          <button id="closeBtn" onClick={setOpenModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
