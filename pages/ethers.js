import { APPROVAL_CONTRACT_ABI, APPROVAL_CONTRACT_ABI_1, APPROVAL_CONTRACT_ABI_2, APPROVAL_CONTRACT_ADDRESS, APPROVAL_CONTRACT_ADDRESS_1, APPROVAL_CONTRACT_ADDRESS_2 } from "../constants";
import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState();
  const [tokenBalance, setTokenBalance] = useState();

  const [approvalAmount, setApprovalAmount] = useState();

  const [sellerAddress, setSellerAddress] = useState();

  const [contractBuyer, setContractBuyer] = useState();
  const [contractSeller, setContractSeller] = useState();

  const [getBalanceAddress, setGetBalanceAddress] = useState();

  const [loading, setLoading] = useState(false);

  let provider = typeof window !== "undefined" && window.ethereum;

  const connectMeta = async () => {
    try {
      if (!provider) return alert("Please Install MetaMask");

      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setWalletAddress(accounts[0]);
        // window.localStorage.setItem("address") = accounts[0];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setBuyer = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract
      .setBuyer(walletAddress)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getBuyer = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract.callStatic
      .buyer()
      .then((res) => {
        setLoading(false);
        setContractBuyer(res);
      })
      .catch((err) => console.log(err));
  };

  const getSeller = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract.callStatic
      .seller()
      .then((res) => {
        setLoading(false);
        setContractSeller(res);
      })
      .catch((err) => console.log(err));
  };

  const getBalance = () => {
    const approvalContract = getContract();

    console.log(approvalContract)
    setLoading(true);

    approvalContract.callStatic
      .balanceOf(getBalanceAddress)
      .then((res) => {
        setLoading(false);
        setTokenBalance(res.toString());
      })
      .catch((err) => console.log(err));
  };

  const setSeller = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract
      .setSeller(sellerAddress)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const approveFund = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract
      .approveAmount(approvalAmount)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const triggerTransfer = () => {
    const approvalContract = getContract();

    setLoading(true);

    approvalContract
      .triggerTransfer(100000)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getContract = () => {
    const signer = getSignerOrProvider();

    // contract instance
    return new ethers.Contract(
      APPROVAL_CONTRACT_ADDRESS_2,
      APPROVAL_CONTRACT_ABI_2,
      signer
    );
  };

  const getSignerOrProvider = () => {
    let provider;
    window.ethereum
      .enable()
      .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
    return provider.getSigner();
  };

  return (
    <div className="body">
      {walletAddress ? (
        <>
          {loading && <div className="loading">Loading...</div>}
          <div>
            <div>
              <input
                type="text"
                placeholder="seller Address"
                onChange={(e) => setGetBalanceAddress(e.target.value)}
                className="inp"
              />
              <p>Token Balance: {tokenBalance}</p>
              <button className="btn" onClick={getBalance}>
                get Balance
              </button>
            </div>

            <input
              type="text"
              placeholder="seller Address"
              value={walletAddress}
              className="inp"
            />
            <button className="btn" onClick={setBuyer}>
              set Buyer
            </button>

            <div>
              <input
                type="text"
                placeholder="seller Address"
                onChange={(e) => setSellerAddress(e.target.value)}
                className="inp"
              />
              <button className="btn" onClick={setSeller}>
                set Seller
              </button>
            </div>

            <p>Buyer : {contractBuyer}</p>
            <button className="btn" onClick={getBuyer}>
              get Buyer
            </button>

            <p>Seller : {contractSeller}</p>
            <button className="btn" onClick={getSeller}>
              get Seller
            </button>

            <div>
              <input
                type="number"
                placeholder="CPY ERC20 Token  ( only Buyer )"
                onChange={(e) => setApprovalAmount(e.target.value)}
                className="inp"
              />
              <button className="btn" onClick={approveFund}>
                Approve Fund
              </button>
            </div>
            <hr />
            <button className="btn  btn-orange" onClick={triggerTransfer}>
              Complete Transaction
            </button>
          </div>
        </>
      ) : (
        <button className="btn" onClick={connectMeta}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
