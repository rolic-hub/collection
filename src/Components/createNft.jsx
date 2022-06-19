import React, {useState} from 'react'
import {Accordion, Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const CreateNft = (props) => {
    const {address} = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const [image, setImage] = useState("");

    const mintNft = async () => {
       if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
      
      
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
    }
  return (
    <div>
      <Accordion style={{ marginTop: "20px" }} flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Create and List Nft</Accordion.Header>
          <Accordion.Body>
            <div className="row">
              {/* <main
                  role="main"
                  className="col-lg-12 mx-auto"
                  style={{ maxWidth: "1000px" }}
                > */}
              <div className="content mx-auto">
                <Row className="g-4">
                  <Form.Control
                    type="file"
                    required
                    name="file"
                    // onChange={uploadToIPFS}
                  />
                  <Form.Control
                    onChange={(e) => setName(e.target.value)}
                    size="lg"
                    required
                    type="text"
                    placeholder="Name"
                  />
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                    required
                    as="textarea"
                    placeholder="Description"
                  />
                  <Form.Control
                    onChange={(e) => setPrice(e.target.value)}
                    size="lg"
                    required
                    type="number"
                    placeholder="Price in ETH"
                  />
                  <div className="d-grid px-0">
                    <Button
                       onClick={mintNft}
                      variant="primary"
                      size="lg"
                    >
                      Create & List NFT!
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
}

export default CreateNft