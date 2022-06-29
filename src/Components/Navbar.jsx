import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import React from "react";
import WalletModal from "./walletModal";
//ckey_03ca034ffa1d4a53b6e223aa9a5

const Navigation = ({
  web3handler,
  walletC,
  unsLogin,
  connect,
  setConnect,
  uauth
}) => {
  const account = window.localStorage.getItem("account");
  return (
    <Navbar expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            src="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"
            width="40"
            height="40"
            className=""
            alt=""
          />
          &nbsp; D-NFT Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginLeft: "50px" }} className="me-auto">
            <Nav.Link style={{ marginLeft: "30px" }} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link style={{ marginLeft: "30px" }} as={Link} to="/my-Nfts">
              My Nfts
            </Nav.Link>
          </Nav>
          <Nav>
            {account ? (
              <Nav.Link
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button nav-button btn-sm mx-4"
              >
                <Button variant="outline-light">
                  {account.slice(0, 5) + "..." + account.slice(38, 42)}
                </Button>
              </Nav.Link>
            ) : (
              <Button onClick={() => setConnect(true)} variant="outline-light">
                Connect Wallet
              </Button>
            )}
            <WalletModal
              web3handler={web3handler}
              walletC={walletC}
              unsLogin={unsLogin}
              connect={connect}
              setConnect={setConnect}
              account={account}
              uauth={uauth}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
