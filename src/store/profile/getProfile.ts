import { Profile } from '../../store/types';
import config from '../../utils/config';

const getProfile = async (walletAddress: string): Promise<Profile> => {
  try {
    const response = await fetch(`${config.baseUrl}/getNFTUserProfile/${walletAddress}`);

    if (!response.ok) return null;

    const responseData = await response.json();
    if (responseData.status === 'success') {
      const dataUserProfile: Profile = responseData.nftUserProfile;
      return dataUserProfile;
    }

    return null;
  } catch (error) {
    return null;
  }
};

export default getProfile;
