import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { Table, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import moment from "moment";
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import nftAbi from "../AbiFolder/NFTCONTRACT.json";

const NftPage = (props) => {
  const { metamaskSigner } = props;
  const { address, tokenId } = useParams();
  const [nftdata, setNftdata] = useState();
  const [transactions, setTransactions] = useState([]);
  const blockchain_id = 80001;
  const feeAccount = "0x12114765eeA16473363682Cf832F5603BB8f6110";
  const account = window.localStorage.getItem("account");

  const nftTransactions = async () => {
    const response = await fetch(
      `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address}/nft_transactions/${tokenId}/?quote-currency=USD&format=JSON&key=ckey_03ca034ffa1d4a53b6e223aa9a5`
    );
    const data = await response.json();
    console.log(data.data.items[0].nft_transactions);
    setTransactions(data.data.items[0].nft_transactions);
  };

  const nftProfile = async () => {
    const response = await fetch(
      `https://api.covalenthq.com/v1/${blockchain_id}/tokens/${address}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=ckey_03ca034ffa1d4a53b6e223aa9a5`
    );
    const data = await response.json();
    console.log(data.data.items[0].nft_data[0]);
    setNftdata(data.data.items[0].nft_data[0]);
  };

  const purchaseNft = async () => {
    try {
      const contract = new ethers.Contract(address, nftAbi.abi, metamaskSigner);
      await (
        await contract.purchaseItem(
          nftdata?.token_id,
          feeAccount,
          nftdata?.owner,
          account,
          { value: nftdata?.token_quote_rate_eth }
        )
      ).wait();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    nftProfile();
    nftTransactions();
  }, []);

  return (
    <div className="background">
      <br />
      <a
        style={{ display: "flex", marginLeft: "60px", textDecoration: "none" }}
        href={`/collection/${address}`}
      >
        <p style={{ fontSize: "25px" }}>
          {" "}
          <MdOutlineArrowBackIosNew color="white" size={"30px"} /> Back
        </p>
      </a>

      <div className="nft-cont">
        <div style={{ marginLeft: "5em" }}>
          <div className="img-container">
            <img
              alt={`Nft-#${tokenId}`}
              className="nft-img"
              src={nftdata?.external_data?.image}
            />
          </div>
          <Button
            disabled = {nftdata?.owner === account ? true : false}
            onClick={purchaseNft}
            style={{ maginTop: "20px", marginLeft: "4.5em" }}
          >
            {nftdata?.token_quote_rate_eth <= 0 ||
            nftdata?.token_quote_rate_eth === null ? (
              <strong>Purchase for Free</strong>
            ) : (
              <strong>{nftdata?.token_quote_rate_eth}MATIC</strong>
            )}
          </Button>
        </div>

        <div className="nft-details">
          <h1>{nftdata?.external_data?.name}</h1>
          <h2>Token ID : {nftdata?.token_id}</h2>
          <p>Description : {nftdata?.external_data?.description}</p>
          <strong
            style={{
              fontSize: "13px",
            }}
          >
            Creator <BsPersonCircle /> :{" "}
            <a
              href={`https://mumbai.polygonscan.com/address/${nftdata?.original_owner}`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: "20px",
                textDecoration: "none",
                color: "yellow",
              }}
            >
              {nftdata?.original_owner}
            </a>
          </strong>
          <br />
          <strong style={{ fontSize: "13px", marginBottom: "20px" }}>
            Owner <BsPersonCircle /> :{" "}
            <a
              href={`https://mumbai.polygonscan.com/address/${nftdata?.owner}`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: "20px",
                textDecoration: "none",
                color: "yellow",
              }}
            >
              {nftdata?.owner}
            </a>
          </strong>
          <table className="nft-table">
            {nftdata?.external_data?.attributes ? (
              <>
                <strong style={{ marginTop: "10px" }}>Attributes</strong>
                {nftdata.external_data.attributes.map((o, i) => {
                  return (
                    <tr key={i}>
                      <td> {o.trait_type} </td>
                      <td> {o.value} </td>
                    </tr>
                  );
                })}
              </>
            ) : null}
          </table>
        </div>
      </div>
      <div style={{ width: "75rem", border: "20px", borderRadius: "5px" }}>
        <h3 style={{ textAlign: "center" }}>Nft Transaction History</h3>
        <Table
          className="table"
          style={{ width: "75rem", marginLeft: "80px" }}
          responsive
          hover
          variant="dark"
          // bordered
        >
          <thead>
            <tr>
              <th>s/n</th>
              <th>Txn Hash</th>
              <th>Block No.</th>
              <th>Type</th>
              <th>Age</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              <th>Txn Fee[wei]</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, i) => (
              <tr>
                <td>{i}</td>
                <td>
                  <a
                    key={i}
                    href={`https://mumbai.polygonscan.com/tx/${item?.tx_hash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "yellow" }}
                  >
                    {(item?.tx_hash).slice(0, 10) + "...."}
                  </a>
                </td>
                <td>
                  <p>{item?.block_height}</p>
                </td>
                <td>
                  <p>
                    {item?.log_events[0].decoded ||
                      item?.log_events[1].decoded.name}
                  </p>
                </td>
                <td>{moment(item?.block_signed_at).fromNow()}</td>
                <td>
                  <p>
                    {item?.successful ? (
                      <strong style={{ color: "green" }}>success</strong>
                    ) : (
                      <strong style={{ color: "red" }}>failed</strong>
                    )}
                  </p>
                </td>
                <td>
                  <a
                    href={`https://mumbai.polygonscan.com/address/${item?.from_address}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "yellow" }}
                  >
                    {(item?.from_address).slice(0, 10) + "...."}
                  </a>
                </td>
                <td>
                  <a
                    href={`https://mumbai.polygonscan.com/address/${item?.to_address}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none", color: "yellow" }}
                  >
                    {(item?.to_address).slice(0, 10) + "...."}
                  </a>
                </td>
                <td>
                  <p> {item?.value} MATIC</p>
                </td>
                <td>
                  <p style={{ fontSize: "13px" }}>{item?.fees_paid}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default NftPage;
