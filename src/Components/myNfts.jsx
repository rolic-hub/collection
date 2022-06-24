import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

const MyNfts = ({ account, collection }) => {
  const blockchain_id = 80001;
  const [data, setData] = useState([]);
  let dataArray = [];
  let addressArray = [];

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
    console.log(data.data.items);
    const result = data.data.items;
    result.forEach((element) => {
      for (let index = 0; index < addressArray.length; index++) {
        if (element.contract_address === addressArray[index]) {
          dataArray.push(element.nft_data[0]);
        }
      }
    });
    setData(dataArray);
  };
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div>
      {data.map((item, i) => (
        <Card key={i} style={{width: "18rem"}} >
          <Card.Img variant="top" src={item?.external_data?.image} />
          <Card.Title>{item?.external_data?.name}</Card.Title>
          <Card.Body>
            <Card.Text>{item?.external_data?.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyNfts;
