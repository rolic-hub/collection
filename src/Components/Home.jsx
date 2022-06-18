import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react'
import {Card, Row, Col} from "react-bootstrap"
import {Link} from 'react-router-dom'
// import nftAbi from '../AbiFolder/NFTCONTRACT.json';
// import {signer} from '../App';

const Home = ({ collection, account, marketplace }) => {
      const [result, setResult] = useState([]);

  const getAllCollection = async () => {
     const collectionCount = await collection.noOfCollections();
     const data = [];
    for (let i = 0; i >= collectionCount; i++) {
      const collectionaddress = await collection.nftCollection(i);
     const items = collection.addressTostruct(collectionaddress);
     data.push({
      name:items.name,
      symbol:items.symbol
     })
    }
    setResult(data);
  };
  useEffect(() => {
    if (account !== "") {
      getAllCollection()
    }
    
  }, [account]);

  return (
    <div className="flex justify-center">
      {result.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {result.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Link to={`/nft//`}>
                    {/* <Card.Img variant="top" src={item.image} /> */}
                    <Card.Body color="secondary">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.symbol}</Card.Text>
                    </Card.Body>
                  </Link>
                 
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No listed assets</h2>
        </main>
      )}
    </div>
  );
};

export default Home