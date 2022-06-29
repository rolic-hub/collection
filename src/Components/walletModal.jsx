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
  useEffect(() => {
    uauth
      .user()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div onClick={web3handler}>
                    <img
                      src={metamask}
                      alt="Metamask"
                      height="100px"
                      style={{ marginLeft: "40px", marginRight: "45px" }}
                    />
                    <strong>Login with Metamask</strong>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <div onClick={walletC}>
                    <img
                      src={WalletConnect}
                      alt="wallet-connect"
                      height="100px"
                    />
                    <strong>Login with Wallet Connect</strong>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <div onClick={() => unsLogin()}>
                    <img
                      src={unsdomain}
                      alt="unstopabble domain"
                      height="100px"
                      style={{ marginLeft: "40px", marginRight: "45px" }}
                    />
                    <strong>Login with Unstoppable Domain</strong>
                  </div>
                </ListGroup.Item>
              </ListGroup>
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
