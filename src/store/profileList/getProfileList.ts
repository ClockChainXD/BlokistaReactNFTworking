import { Profile } from '../types';
import config from '../../utils/config';

const getProfileList = async (): Promise<Profile[]> => {
  try {
    const response = await fetch(`${config.baseUrl}/getNFTUserList`);
    if (!response.ok) return null;
    const responseData = await response.json();
    if (responseData.status === 'success') {
      const profileList: Profile[] = responseData.nftUserList;
      return profileList;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default getProfileList;
