import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastComp = ({ show, setShow, message }) => {
  return (
    <ToastContainer position="top-end">
      <Toast show={show} onClose={() => setShow(!show)}>
        <Toast.Header>
          <strong className="me-auto">Message</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastComp;
