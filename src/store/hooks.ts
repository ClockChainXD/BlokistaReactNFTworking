

import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './';
import { PriceState, ProfileListState, ProfileState, State } from './types';
import { fetchProfile } from './profile';
import { fetchPrices } from './prices';
import { fetchProfileList } from './profileList';


// Profile

export const useFetchProfile = () => {
  const { library, chainId, account, active } = useWeb3React();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
      dispatch(fetchProfile(account));
    }
  }, [library, account, active, chainId, dispatch]);
};

export const useProfile = () => {
  const { isInitialized, isLoading, data }: ProfileState = useSelector((state: State) => state.profile);
  return { profile: data, hasProfile: isInitialized, isInitialized, isLoading };
};

// ProfileList

export const useFetchProfileList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProfileList());
  }, [dispatch]);
};

export const useProfileList = () => {
  const { isInitialized, isLoading, data }: ProfileListState = useSelector((state: State) => state.profileList);
  return { profileList: data, hasProfile: isInitialized, isInitialized, isLoading };
};

export const useProfileForWallet = (address: string) => {
  const { isInitialized, isLoading, data }: ProfileListState = useSelector((state: State) => state.profileList);
  const profile = (data && address) ? data.find(profile => profile.walletAddress.toLowerCase() == address.toLowerCase()) : null;
  return { profile: profile, hasProfile: isInitialized, isInitialized, isLoading };
};

// Prices
export const useFetchPriceList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);
};

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data);
  return prices;
};

export const useGetApiPrice = (address: string) => {
  const prices = useGetApiPrices();

  if (!prices) {
    return null;
  }

  return prices[address.toLowerCase()];
};