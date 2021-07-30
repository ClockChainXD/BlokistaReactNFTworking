import { Contract } from '@ethersproject/contracts';
import WBNBABI from './abis/BlokistaVault.json';
import BlokistaAuctionABI from './abis/BlokistaAuction.json';
import BlokistaVaultABI from './abis/BlokistaVault.json';

export const Networks = {
  MainNet: 56,
  Testnet: 97,
  
};

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    BlokistaVault: {
      address: '0x79529664A46FcB3152b3F08735dd22aB9DE08b1d',
      abi: BlokistaAuctionABI,
    },
    WBNB: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0x3173c24Da954b632991275FAB28A4BC4638Cfd6E',
      abi: BlokistaAuctionABI,
    }
  },
  [Networks.Testnet]: {
    BlokistaVault: {
      address: '0x79529664A46FcB3152b3F08735dd22aB9DE08b1d',
      abi: BlokistaVaultABI,
    },
    WBNB: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0x3173c24Da954b632991275FAB28A4BC4638Cfd6E',
      abi: BlokistaAuctionABI,
    }
  },
 
};

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;
 
export function getContractInfo(name, chainId) {
  //if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
 if(contracts){
    return contracts?.[name];
  }
  else{
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash: string) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  
  
  const info = getContractInfo(name, chainId);
  return new Contract(info.address, info.abi, provider);
}

export const shorter = (str: string) => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);
