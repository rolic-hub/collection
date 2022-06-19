import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Accordion, Row, Form, Button } from "react-bootstrap";
import "./style.css";
import CreateNft from "./createNft";


const CollectionView = (props) => {
  const { collection, account } = props;
  const [result, setResult] = useState([]);
  const [nftData, setNftdata] = useState();
  const { address } = useParams();
  const blockchain_id = 80001;

  const getData = async () => {
    const collectionData = await collection.addressTostruct(address);

    setResult(collectionData);
  };

  const makeRequest = async () => {
    const response = await fetch(
      `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address}/nft_token_ids/?key=ckey_03ca034ffa1d4a53b6e223aa9a5`
    );
    const data = response.json();
    console.log(data);
    setNftdata(data);
  };
  useEffect(() => {
     makeRequest();
    if (account !== "") {
      getData();
    }
  }, []);
  return (
    <div className="collection">
      <div className="dashboard">
        <h1>{result._name} Dashboard</h1>
      </div>

      <Card style={{ height: "20rem", width: "65rem", marginLeft: "50px" }}>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
            alt="CollectionImage"
            height="250px"
            width="300px"
          />

          <div style={{ marginLeft: "150px", marginTop: "20px" }}>
            <p>Collection address</p>
            <strong>{address}</strong>
            <div
              style={{
                display: "flex",
              }}
            >
              <strong>
                {" "}
                Collection Name <br /> {result._name}
              </strong>
              <strong>
                {" "}
                Collection Symbol <br /> {result._symbol}
              </strong>
            </div>
          </div>
        </Card.Body>
      </Card>
     <CreateNft address={address}/>
      <div style={{ marginTop: "10px" }}>
        <Card>
          <Card.Header className="text-center">
            <strong>NFT Preview</strong>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CollectionView;
