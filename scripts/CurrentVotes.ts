import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { createPublicClient, http, formatEther, createWalletClient, toHex, hexToString } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
    const parameters = process.argv.slice(2);
    if (!parameters || parameters.length < 2)
      throw new Error("Parameters not provided\nParam1: contract address\nParam2: proposalnumber");
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
      });
    
    const contractAddress = parameters[0] as `0x${string}`;
    const proposal = parameters[1];

    if (!contractAddress) throw new Error("Contract address not provided");
    if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
      throw new Error("Invalid contract address");

    const result = await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: "proposals",
        args: [proposal],
      }) as any[];
      console.log(`Proposal ${proposal} ${hexToString(result[0], { size: 32 })} has ${result[1]} votes so far.`);
    process.exit();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});