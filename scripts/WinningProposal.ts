import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { createPublicClient, http, formatEther, createWalletClient, toHex, hexToString } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";


async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 1)
      throw new Error("Parameters not provided");
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
      });
    
    const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
    const contractAddress = parameters[0] as `0x${string}`;

    const anyone = createWalletClient({
        account,
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
      });

    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");
    //const voterAddress = parameters[1];
    //if (!voterAddress) throw new Error("Voter address not provided");

    const result = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "winnerName",
        args: [],
      }) as `0x${string}`;
      console.log("The winner is:", hexToString(result, {size: 32}));
    process.exit();

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});