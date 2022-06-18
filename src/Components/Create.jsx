import React, {useState} from 'react'
import { Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({collection}) => {
     const [image, setImage] = useState("");
     const [price, setPrice] = useState(null);
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [collectionname, setCollectionName] = useState("");
     const [symbol, setSymbol] = useState("");
     

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

     const createCollection = async () => {
        if(!symbol || !collectionname ) return ;
        try {
          await (await collection.createCollection(collectionname, symbol)).wait()
 
        } catch (error) {
            console.log(error);
        }
     }
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
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
                  // onClick={createNFT}
                  variant="primary"
                  size="lg"
                >
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>

      <hr />
      <div className="row">
        <main
          role="main"
          className="col-lg-12 mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                // onChange={uploadToIPFS}
              />
              <Form.Control
                onChange={(e) => setCollectionName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <Form.Control
                onChange={(e) => setSymbol(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Symbol"
              />
              <div className="d-grid px-0">
                <Button
                 onClick={createCollection}
                  variant="primary"
                  size="lg"
                >
                  Create Collection
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create