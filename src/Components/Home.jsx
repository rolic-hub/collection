import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "./loading";

const Home = (props) => {
  const { collection, account } = props;
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  var data = [];
  const getAllCollection = async () => {
    setLoading(true);
    const collectionCount = await collection?.noOfCollections();
    for (let i = 0; i < collectionCount; i++) {
      const Nftaddress = await collection.nftCollection(i);
      const items = await collection.addressTostruct(Nftaddress);
       setLoading(false);
      data.push({
        name: items._name,
        symbol: items._symbol,
        image: items._image,
        address: Nftaddress
        
      });
    }

    setResult(data);
   
  };
 useEffect(() => {
    if (account !== null || account !== undefined) {
      getAllCollection();
    }
  }, []);
  
  return (
    <div className="flex justify-center">
      <Button style={{margin:"30px"}}>
        <Link style={{textDecoration:"none", color:"white"}} to="/create">
        Create New Collection
        </Link>
      </Button>
      {result.length > 0 ? (
        <div className="px-5 container">
          {/* {coverPhotos.map((item, i) => (
            <img src="" alt="">
          ))} */}
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {result.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" height="200px" src={item.image}/>
                  <Link style={{textDecoration:"none"}} to={`/collection/${item.address}`}>
                    <Card.Body color="secondary">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.symbol} <br /> {(item.address).slice(0,20)}...
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
          <h2 style={{ margin: "30px" }}>No listed Collection</h2>
        </main>
      )}
    </div>
  );
};

export default Home;
