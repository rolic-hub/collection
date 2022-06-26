import React, { useState } from "react";
import { Accordion, Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { RiAddCircleLine } from "react-icons/ri";
import "./style.css";
import { ethers } from "ethers";
import nftAbi from "../AbiFolder/NFTCONTRACT.json";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateNft = (props) => {
  const { address, metamaskSigner } = props;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState("");
  const [trait, settrait] = useState(false);
  const [firstTrait, setFirstTrait] = useState("");
  const [secTrait, setSecTrait] = useState("");
  const [thirdTrait, setThirdTrait] = useState("");
  const [fourthTrait, setFourthTrait] = useState("");
  const [fifthTrait, setFifthTrait] = useState("");
  const [firstTraitValue, setFirstTraitValue] = useState("");
  const [secTraitValue, setSecTraitValue] = useState("");
  const [thirdTraitValue, setThirdTraitValue] = useState("");
  const [fourthTraitValue, setFourthTraitValue] = useState("");
  const [fifthTraitValue, setFifthTraitvalue] = useState("");

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const mintNft = async () => {
    const format = {
      name: name,
      description: description,
      image: image,
      value: price,
      token_price_wei: price * 10**18,
      attributes: [
        {
          trait_type: firstTrait,
          value: firstTraitValue,
        },
        {
          trait_type: secTrait,
          value: secTraitValue,
        },
        {
          trait_type: thirdTrait,
          value: thirdTraitValue,
        },
        {
          trait_type: fourthTrait,
          value: fourthTraitValue,
        },
        {
          trait_type: fifthTrait,
          value: fifthTraitValue,
        },
      ],
    };
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(JSON.stringify(format));
      console.log(result);
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
      getNftContract(uri);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const getNftContract = async (uri) => {
    setLoading(true);
    try {
      const nftContract = new ethers.Contract(
        address,
        nftAbi.abi,
        metamaskSigner
      );
      await (await nftContract.mint(uri)).wait();
     
    } catch (error) {
      console.log("Could not mint Nft", error);
    }
  };

  const show = () => {
    if (trait) {
      settrait(false);
    } else {
      settrait(true);
    }
  };

  return (
    <div>
      <Accordion
        style={{ marginTop: "20px", width: "65rem", marginLeft: "50px" }}
        flush
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {" "}
            <strong style={{ textAlign: "center", marginLeft:"400px" }}> Create and List Nft</strong>
          </Accordion.Header>
          <Accordion.Body>
            <div className="row">
              <div className="content mx-auto">
                <Row className="g-4">
                  <Form.Control
                    type="file"
                    required
                    name="file"
                    onChange={uploadToIPFS}
                  />
                  <Form.Group>
                    <Form.Label>Name of NFT</Form.Label>
                    <Form.Control
                      onChange={(e) => setName(e.target.value)}
                      size="lg"
                      required
                      type="text"
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>NFT Description</Form.Label>
                    <Form.Control
                      onChange={(e) => setDescription(e.target.value)}
                      size="lg"
                      required
                      as="textarea"
                      placeholder="Description"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Traits</Form.Label>

                    <Button style={{ marginLeft: "10px" }} onClick={show}>
                      <RiAddCircleLine />
                    </Button>
                    <br />
                    {trait ? (
                      <>
                        {" "}
                        <Form.Text style={{ fontSize: "17px" }}>
                          Traits are optional
                        </Form.Text>
                        <br />
                        <Form.Text>Input traits in key-value format</Form.Text>
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            onChange={(e) => setFirstTrait(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="Key"
                            className="trait"
                          />
                          <strong className="traittext">:</strong>
                          <Form.Control
                            onChange={(e) => setFirstTraitValue(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="value"
                            className="trait"
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            onChange={(e) => setSecTrait(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="key"
                            className="trait"
                          />
                          <strong className="traittext">:</strong>
                          <Form.Control
                            onChange={(e) => setSecTraitValue(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="value"
                            className="trait"
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            onChange={(e) => setThirdTrait(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="Key"
                            className="trait"
                          />
                          <strong className="traittext">:</strong>
                          <Form.Control
                            onChange={(e) => setThirdTraitValue(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="value"
                            className="trait"
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            onChange={(e) => setFourthTrait(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="Key"
                            className="trait"
                          />
                          <strong className="traittext">:</strong>
                          <Form.Control
                            onChange={(e) =>
                              setFourthTraitValue(e.target.value)
                            }
                            size="sm"
                            type="text"
                            placeholder="value"
                            className="trait"
                          />
                        </div>
                        <div style={{ display: "flex" }}>
                          <Form.Control
                            onChange={(e) => setFifthTrait(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="Key"
                            className="trait"
                          />
                          <strong className="traittext">:</strong>
                          <Form.Control
                            onChange={(e) => setFifthTraitvalue(e.target.value)}
                            size="sm"
                            type="text"
                            placeholder="value"
                            className="trait"
                          />
                        </div>
                      </>
                    ) : (
                      <p>No traits specified</p>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      onChange={(e) => setPrice(e.target.value)}
                      size="lg"
                      required
                      type="number"
                      placeholder="Price"
                    />
                  </Form.Group>

                  <div style={{ width: "20rem" }}>
                    <Button onClick={mintNft} variant="primary" size="lg">
                      {loading ? "..loading" : "CreateNft"}
                    </Button>
                  </div>
                </Row>
              </div>
              {/* </main> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CreateNft;
