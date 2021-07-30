import { string } from "prop-types";



/*



This is the missing part of the project.
I was creating this file but I couldn't figured out 'State' interface. Which object declarations should it has? 

We need to define interfaces of the api responses and blokchain objects. Those responses comes from database like this :




let NFTUserSchema = new Schema({
    walletAddress: String,

    displayName: String,
    customUrl: String,
    userBio: String,
    userAvatarUrl: String,
    userBackgroupUrl: String,

    socialPortfolioUrl: String,
    socialTwitterUrl: String,

    accountCreatedAt: Date,
    updatedAt: Date,
    banned: { type: Boolean, default: false },
    verified: { type: Boolean, default: false }
});

let NFTObjectSchema = new Schema({
    baseID: String,

    name: String,
    description: String,
    image: String,

    nftType: Number,
    price: String,
    minBidPrice: String,
    startTime: String,
    endTime: String,

    mintTransactionHash: String,
    updatedAt: Number,
    createdAt: Number,
    initialCreatorAddress: String,
    ownerAddress: String,
    tokenID: Number,

    voteCount: Number,
    listed: { type: Boolean, default: false },
    attributes: [{ trait_type: String, value: Number }],
    category: [String],

    approved: { type: Boolean, default: false },
    verified: { type: Boolean, default: false }
});
NFTEventSchema = new Schema({
    doneOn: Number,
    
    ----- eventType -----
    0 : MINT,
    1: SALE,
    2: PRICE_UPDATE,
    3: UPDATE_STATUS,
    4: BURN,
    5: BID_CREATE,
    6: BID_CANCEL,
    7: SELL_ON_BID
    8: AUCTION_START

    ----- nftType -----
    0: Fixed Token
    1: Auction Token
    2: Unlimited Auction Token

    

    eventType: Number,
    nftIDSold: Number,
    transactionHash: String,

    minter: String,
    nftType: String,
    price: String,
    minBidPrice: String,
    startTime: String,
    endTime: String,

    seller: String,
    buyer: String,
    nftSoldAtPrice: Number,

    priceUpdater: String,
    newNftPrice: Number,
    oldNftPrice: Number,

    auctionStarter: String,

    statusUpdater: String,
    isListed: Boolean,

    bidder: String,
    bidPrice: Number
});

let NFTBidSchema = new Schema({
    doneOn: Number,
    tokenID: Number,
    transactionHash: String,

    bidder: String,
    price: Number
});



*/

export type PriceApiResponse={
    updated_at: string
    data: {
      [key: string]: {
        name: string
        symbol: string
        price: string
        price_BNB: string
      }
    }
  }

  export interface PriceApiThunk {

    updated_at: string
    data: PriceApiResponse["data"]

}
export interface PriceState{
    isLoading: boolean
    lastUpdated: string
    data: PriceApiResponse["data"]

}
export interface State{
    
    prices: PriceState;
    profile: ProfileState
    profileList: ProfileListState
    

}
export interface ProfileListState{
    isInitialized: boolean
    isLoading: boolean
    data: Profile[]

}

export interface Profile{
    walletAddress: string

    displayName: string
    customUrl: string
    userBio: string
    userAvatarUrl: string
    userBackgroupUrl: string
  
    socialPortfolioUrl: string
    socialTwitterUrl: string

    accountCreatedAt: Date
    updatedAt: Date
    banned: boolean
    verified: boolean



}
export interface ProfileState {
    isInitialized: boolean
    isLoading: boolean
    data: Profile
  }