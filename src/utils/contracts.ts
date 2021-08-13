import '@ethersproject/shims';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { getContractObj } from '.';
import { Contract, Provider } from 'ethers-multicall';

export async function mint(chainId, provider, _tokenURI, _nftName, _loyaltyFee,category,subcategory) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract._mint(_tokenURI,_nftName,_loyaltyFee,category,subcategory);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function multipleMint(chainId: any, provider: ethers.Signer | ethers.providers.Provider | undefined, _tokenURIs: any, _nftName: any,_amountOfToken: any ,_loyaltyFee: any) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    const tx = await nftContract._multipleMint(_tokenURIs,_nftName,_amountOfToken,_loyaltyFee);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function buy(chainId: any, provider, _tokenID, _price) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
   _price= _price.toString();
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

export async function sell(chainId: any, provider, _tokenID, _price) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  _price=_price.toString();
  const thisprice=ethers.utils.parseEther(_price)
  try {
    const tx = await nftContract.justSell([_tokenID],1,[thisprice]);
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function bid(chainId: any, library: { getBalance: (arg0: any) => any; }, provider: ethers.Signer | ethers.providers.Provider | undefined, account: any, _tokenID: any, _price: string) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    _price=_price.toString();

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
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  try {
    _price=_price.toString();

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

export async function startAuction(chainId, provider, _tokenID, _startPrice,_minBidIncPrice, _instantPrice) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  
  try {
    const tx = await nftContract.createAuction(_tokenID,ethers.utils.parseEther(_startPrice.toString()),parseFloat(_minBidIncPrice.toString()),ethers.utils.parseEther(_instantPrice.toString()));
    await tx.wait(1);

    return tx.hash;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function startDeadlineAuction(chainId, provider, _tokenID, _startPrice, _minBidPrice, _endTime,_instantPrice) {
  const nftContract = getContractObj('BlokistaAuction', chainId, provider);
  const endUnixTimeStamp = Math.round(_endTime.getTime() / 1000);
  try {
    const tx = await nftContract.createDeadlineAuction(_tokenID, ethers.utils.parseEther(_startPrice.toString()) , parseFloat(_minBidPrice.toString()), endUnixTimeStamp,ethers.utils.parseEther(_instantPrice.toString()));
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

/*export async function getBalanceOfWBNB(chainId, provider, account) {
  const wBNBContract = getContractObj('WBNB', chainId, provider);
  try {
    const balanceWBNB = await wBNBContract.balanceOf(account);
    return parseFloat(ethers.utils.formatEther(balanceWBNB));
  } catch (e) {
    console.log(e);
    return 0;
  }
}
*/
export async function getBalanceOfBNB(library, account) {
  try {
    const balanceBNB = await library.getBalance(account);
    return parseFloat(ethers.utils.formatEther(balanceBNB));
  } catch (e) {
    console.log(e);
    return 0;
  }
}
