import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = (props) => {
  const [result, setResult] = useState([]);
  const { collection, account } = props;
  var data = [];
  const getAllCollection = async () => {
    const collectionCount = await collection?.noOfCollections();
    for (let i = 0; i < collectionCount; i++) {
      const Nftaddress = await collection.nftCollection(i);
      const items = await collection.addressTostruct(Nftaddress);
      data.push({
        name: items._name,
        symbol: items._symbol,
        address: Nftaddress,
      });
    }
    setResult(data);
  };
  useEffect(() => {
    getAllCollection();
  });

  return (
    <div className="flex justify-center">
      {result.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {result.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Link to={`/collection/${item.address}`}>
                    {/* <Card.Img variant="top" src={item.image} /> */}
                    <Card.Body color="secondary">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.symbol} <br /> {item.address}
                      </Card.Text>
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

export default Home;
