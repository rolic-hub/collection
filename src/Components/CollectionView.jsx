import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./style.css";
import CreateNft from "./createNft";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const CollectionView = (props) => {
  const { collection, account, metamaskSigner, coverPhotos } = props;
  const [result, setResult] = useState([]);
  const [nftData, setNftdata] = useState();
  const [imageBox, SetImage] = useState([]);
  const [count, setCount] = useState(0)
  const [tokenId, setTokenId] = useState(null);

  const { address } = useParams();
  const blockchain_id = 80001;

  let imageArray = [];
  let token_id = [];

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
      token_id.push(id);
      

    });
    setCount(token_id.length)
    nftPreview();
  };

  const nftPreview = async () => {
    for (let i = 0; i < token_id.length; i++) {
      const id = token_id[i];
      const response = await fetch(
        `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=ckey_03ca034ffa1d4a53b6e223aa9a5`
      );
      const data = await response.json();
      const result = data.data.items[0].nft_data[0].external_data.image_256;
      
      imageArray.push(result);
    }
    SetImage(imageArray);
    console.log(imageArray);
  };
  useEffect(() => {
    makeRequest();

    if (account !== "") {
      getData();
    }
  }, [tokenId]);
  return (
    <div className="collection-background">
      <br />

      <div className="collection">
        <div>
          <h1 style={{ margin: "25px" }}>{result._name} Dashboard</h1>
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
              style={{ marginLeft: "10px" }}
            />

            <div style={{ marginLeft: "150px", marginTop: "50px" }}>
              <strong style={{ color: "white" }}>Collection address</strong>
              <br />
              <strong style={{ fontSize: "20px" }}>
                <a
                  href={`https://mumbai.polygonscan.com/address/${address}`}
                  style={{
                    textDecoration: "none",
                    color: "yellow",
                  }}
                >
                  {address}
                </a>{" "}
              </strong>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                }}
              >
                <strong style={{ color: "white", marginRight: "50px" }}>
                  {" "}
                  Collection Name <br /> <br />
                  <strong style={{ marginLeft: "30px" }}>{result._name}</strong>
                </strong>

                <strong style={{ color: "white", marginRight: "50px" }}>
                  {" "}
                  Collection Symbol <br /> <br />
                  <strong style={{ marginLeft: "50px" }}>
                    {result._symbol}
                  </strong>
                </strong>
                <strong style={{ color: "white" }}>
                  {" "}
                  Collection Count <br /> <br />
                  <strong style={{ marginLeft: "50px" }}>
                    {count}
                  </strong>
                </strong>
              </div>
            </div>
          </Card.Body>
        </Card>
        <a
          style={{
            display: "flex",
            marginLeft: "60px",
            textDecoration: "none",
            marginTop: "20px",
          }}
          href={`/collection/${address}`}
        >
          <p style={{ fontSize: "25px" }}>
            {" "}
            <MdOutlineArrowBackIosNew color="white" size={"30px"} /> Back
          </p>
        </a>
        <CreateNft address={address} metamaskSigner={metamaskSigner} />
        <div style={{ marginTop: "50px" }}>
          {imageBox.length > 0 ? (
            <>
              <h4 style={{ marginLeft: "50px" }}> NFT PREVIEW </h4>
              <div className="collection-display">
                {imageBox.map((image, i) => (
                  <div className="nft">
                    <a href={`/nft/${address}/${tokenId}`}>
                      <img src={image} alt={`Nft#${tokenId}`} />
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <br />
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default CollectionView;
