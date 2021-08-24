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
      address: '0xCAD0dEa1695d1Da5475A54084C6Da811a3271A26',
      abi: BlokistaVaultABI,
    },
    WBNB: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0x86b20a5BE63e5C8F34330a098b22956AdD06b651',
      abi: BlokistaAuctionABI,
    }
  },
  [Networks.Testnet]: {
    BlokistaVault: {
      address: '0x6123e91bcB7Dec17fF7F875FB839f7B9dBBbAE9B',
      abi: BlokistaVaultABI,
    },
    WBNB: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0xc8901DA6C86edb1DE8d19C7Ce51011cb5098Bb05',
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
  if(info)
  return new Contract(info.address, info.abi, provider);

  else
  return;
}

export const shorter = (str: string) => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);
