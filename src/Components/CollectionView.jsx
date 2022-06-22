import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./style.css";
import CreateNft from "./createNft";
import {Link} from 'react-router-dom'

const CollectionView = (props) => {
  const { collection, account, metamaskSigner } = props;
  const [result, setResult] = useState([]);
  const [nftData, setNftdata] = useState();
  const [tokenId, setTokenId] = useState(null);
  const [image, setImage] = useState("")
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
    const data = await response.json();
    const result = data.data.items;
    result.forEach((element) => {
      const id = element.token_id;
      setTokenId(id);
      nftPreview(id);
    });

  };

  const nftPreview = async (id) => {
     const response = await fetch(`https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=ckey_03ca034ffa1d4a53b6e223aa9a5`)
     const data = await response.json();
     
     setImage(data.data.items[0].nft_data[0].external_data.image_256);
  }
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

      <Card className="contract_profile">
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
      <CreateNft address={address} metamaskSigner={metamaskSigner} />
      <div style={{ marginTop: "10px" }}>
        <Card className="collection-display">
          <Card.Header className="text-center">
            <strong>NFT Preview</strong>
          </Card.Header>
          <Card.Body>
            <div className="nft">
              <Link to={`/nft/${address}/${tokenId}`}>
               <img src={image} alt={`Nft#${tokenId}`} />
              </Link>
             
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CollectionView;
