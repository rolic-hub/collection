import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNfts = ({ collection }) => {
  const blockchain_id = 80001;
  const [data, setData] = useState([]);
  let dataArray = [];
  let addressArray = [];
  //let contractAddress = [];

  const account = window.localStorage.getItem("account");

  const getAddress = async () => {
    const collectionCount = await collection?.noOfCollections();
    for (let i = 0; i < collectionCount; i++) {
      const Nftaddress = await collection.nftCollection(i);
      addressArray.push(Nftaddress);
    }
    makeRequest();
  };
  const makeRequest = async () => {
    const response = await fetch(
      `https://api.covalenthq.com/v1/${blockchain_id}/address/${account}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=ckey_03ca034ffa1d4a53b6e223aa9a5`
    );
    const data = await response.json();
    const result = data.data.items;
    result.forEach((element) => {
      for (let index = 0; index < addressArray.length; index++) {
        if (
          element.contract_address.toLowerCase() ===
          addressArray[index].toLowerCase()
        ) {
          const result = element.nft_data;
          //contractAddress.push(element.contract_address)
          result.forEach((element) => {
            dataArray.push(element);
          });
        }
      }
    });
    console.log(dataArray)

    setData(dataArray);
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div style={{ margin: "50px" }}>
      {data.length > 0 ? (
        <Row xs={1} md={2} lg={4} className="g-4 py-5">
          {data.map((item, i) => (
            <Col key={i} className="overflow-hidden">
              <Card key={i} style={{ width: "18rem", margin: "20px" }}>
                <Card.Img
                  variant="top"
                  height="300px"
                  src={item?.external_data?.image}
                />
                <Card.Title style={{ marginLeft: "20px" }}>
                  {item?.external_data?.name}
                </Card.Title>
                <Card.Body>
                  <Card.Text>
                    {item?.external_data?.description.slice(0, 60)}....
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          <h3>
            User has no Nft associated with 
            <br/>
            contract adresses on this
            platform
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyNfts;
