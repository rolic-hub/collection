import React, { useState, useEffect } from "react";
import { Modal, Button, Card, ListGroup } from "react-bootstrap";
import metamask from "../assets/metamask.png";
import unsdomain from "../assets/unsdomain.png";
import WalletConnect from "../assets/WalletConnect.jpg";

const WalletModal = ({
  web3handler,
  walletC,
  unsLogin,
  connect,
  setConnect,
  account,
  uauth,
}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  

  return (
    <>
      <Modal
        show={connect}
        onHide={() => setConnect(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login to Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Card>
              <button style={{ padding: "5px" }} onClick={web3handler}>
                <img
                  src={metamask}
                  alt="Metamask"
                  height="50px"
                  style={{ marginLeft: "-150px" }}
                />
                <strong style={{ marginLeft: "30px" }}>
                  Login with Metamask
                </strong>
              </button>{" "}
              <button style={{ padding: "5px" }} onClick={walletC}>
                <img
                  src={WalletConnect}
                  alt="wallet-connect"
                  height="50px"
                  style={{ marginLeft: "-100px" }}
                />
                <strong style={{ marginLeft: "30px" }}>
                  Login with Wallet Connect
                </strong>
              </button>{" "}
              <button style={{ padding: "5px" }} onClick={unsLogin}>
                <img
                  src={unsdomain}
                  alt="unstopabble domain"
                  height="50px"
                  style={{ marginLeft: "-70px" }}
                />
                <strong style={{ marginLeft: "30px" }}>
                  Login with Unstoppable Domain
                </strong>
              </button>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConnect(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WalletModal;
