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
      address: '0xc342f9A22289DEC49B70EdD0E39aEcDca5991034',
      abi: BlokistaVaultABI,
    },
    WBNB: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0x75f84EC7643dEC4c44551D942A4c61c608398F81',
      abi: BlokistaAuctionABI,
    }
  },
  [Networks.Testnet]: {
    BlokistaVault: {
      address: '0xe5E86d0AD9b12feD28B357E33447c0B1ba783772',
      abi: BlokistaVaultABI,
    },
    WBNB: {
      address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      abi: WBNBABI,
    },
    BlokistaAuction:{
      address: '0x8c6fb1C981978f4C9b3025C444B40B6A8CFBC1ca',
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
