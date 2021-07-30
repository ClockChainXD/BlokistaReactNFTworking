import '@ethersproject/shims';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { getContractObj } from '.';
import { Contract, Provider } from 'ethers-multicall';

export async function mint(chainId, provider, _tokenURI, _nftName, _loyaltyFee) {
  const nftContract = getContractObj('BlokistaVault', chainId, provider);
  try {
    const tx = await nftContract.mint(_tokenURI,_nftName,_loyaltyFee);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function multipleMint(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenURIs: any, _nftName: any,_amountOfToken: any ,_loyaltyFee: any) {
  const nftContract = getContractObj('BlokistaVault', chainId, provider);
  try {
    const tx = await nftContract.multipleMint(_tokenURIs,_nftName,_amountOfToken,_loyaltyFee);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function buy(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenID: any, _price: string) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.buy(_tokenID, {
      value: ethers.utils.parseEther(_price),
    });
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function sell(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenID: any, _buyer: any) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.justSell(_tokenID, _buyer);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function bid(chainId: any, library: { getBalance: (arg0: any) => any; }, provider: ethers.Signer | ethers.providers.Provider | undefined, account: any, _tokenID: any, _price: string) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  const wBNBContract = getContractObj('WBNB', chainId, provider);
  try {
    const balanceWBNB = await wBNBContract.balanceOf(account);
    const balanceBNB = await library.getBalance(account);
    const dBalanceBNB = parseFloat(ethers.utils.formatEther(balanceBNB));
    const dBalanceWBNB = parseFloat(ethers.utils.formatEther(balanceWBNB));
    const dPrice = parseFloat(_price);

    if (dPrice > dBalanceBNB + dBalanceWBNB) return false;

    if (dPrice > dBalanceWBNB) {
      const load_toast_id = toast.loading('Plesae wait, Converting BNB to WBNB...');
      const depositeAmount = dPrice - dBalanceWBNB;
      const convertBNBToWBNB = await wBNBContract.deposit({
        value: ethers.utils.parseEther(depositeAmount.toString()),
      });
      await convertBNBToWBNB.wait(1);
      toast.dismiss(load_toast_id);
    }
    const load_approve_toast_id = toast.loading(`Plesae wait, ${dPrice} WBNB is approving now...`);
    const approveWBNB = await wBNBContract.approve(nftContract.address, ethers.utils.parseEther(dPrice.toString()));
    await approveWBNB.wait(1);
    toast.dismiss(load_approve_toast_id);

    const load_bid_toast_id = toast.loading(`Plesae wait until send bid offer...`);
    const placeBidToNFT = await nftContract.makeOffer(_tokenID, ethers.utils.parseEther(_price), { value: ethers.utils.parseEther(_price),});
    await placeBidToNFT.wait(1);
    toast.dismiss(load_bid_toast_id);

    return true;
  } catch (e) {
    toast.dismiss();
    console.log(e);
    return false;
  }
}

export async function cancelBid(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenID: any) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.cancelAuction(_tokenID);
    await tx.wait(1);
    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function updatePrice(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenId: any, _price: string) {
  const nftContract = getContractObj('BlokistaVault', chainId, provider);
  try {
    const tx = await nftContract.updatePriceAsOwner(_tokenId, ethers.utils.parseEther(_price));
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function cancelAuction(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenId: any) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.cancelAuction(_tokenId);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function burn(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenID: any) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.burn(_tokenID);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function startAuction(chainId, provider, _tokenID, _minBidPrice: { toString: () => string; }, _endTime: { getTime: () => number; }) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  const endUnixTimeStamp = Math.round(_endTime.getTime() / 1000);
  try {
    const tx = await nftContract.createDeadlineAuction(_tokenID, ethers.utils.parseEther(_minBidPrice.toString()), endUnixTimeStamp);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function claimAuction(chainId, provider, _tokenID) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract.acceptOffer(_tokenID);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}


export async function getFeePercent(chainId, provider) {
  const nftContract = getContractObj('BlokistaVault', chainId, provider);
  try {
    const feePercent = await nftContract.getFeePercent();
    return parseFloat(feePercent.toString());
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getBalanceOfWBNB(chainId, provider, account) {
  const wBNBContract = getContractObj('WBNB', chainId, provider);
  try {
    const balanceWBNB = await wBNBContract.balanceOf(account);
    return parseFloat(ethers.utils.formatEther(balanceWBNB));
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getBalanceOfBNB(library, account) {
  try {
    const balanceBNB = await library.getBalance(account);
    return parseFloat(ethers.utils.formatEther(balanceBNB));
  } catch (e) {
    console.log(e);
    return 0;
  }
}
