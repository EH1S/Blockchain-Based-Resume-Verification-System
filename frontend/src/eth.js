import { BrowserProvider, Contract } from "ethers";
import ResumeVerifier from "./contracts/ResumeVerifier.json";

//MetaMask Wallet Address
export const ADMIN_ADDRESS = "0xab5a7c4fb9a1997d10b50731165061cd3f48d135".toLowerCase();

//Smart contract address
const CONTRACT_ADDRESS = "0x8E06DCaBC3AbB1Cda47dCc485D819583457fe359";

export async function getSignerContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, ResumeVerifier.abi, signer);
  return { contract, signer };
}
