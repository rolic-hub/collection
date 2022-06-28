import React, { useState } from "react";
import { Modal, Row, Form, Button } from "react-bootstrap";
import { getContract } from "./createNft";

const TransferModal = ({ show, account, tokenId, callTransfer }) => {
  const [addressTo, setAddressto] = useState("");

  

  return (
    <Modal show={show}>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <div>
          <Row className="g-4">
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control type="string" required value={account} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label>To</Form.Label>
              <Form.Control
                onChange={(e) => setAddressto(e.target.value)}
                size="sm"
                required
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>TokenId</Form.Label>
              <Form.Control size="sm" required type="number" value={tokenId} readOnly />
            </Form.Group>
            <Button onClick={() => callTransfer(addressTo)} variant="primary">transfer</Button>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransferModal;
