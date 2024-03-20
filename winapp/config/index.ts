import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x65B5DF6BB4A756EbE484faf0E3fa1e12c9874803", //contract add
        abi as any,
        signer
    );
}