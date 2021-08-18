import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { setupNetwork } from '../utils/wallet';
import { injectedConnector } from "../utils/connectors";
import { toast } from 'react-hot-toast';
import { currentNetwork } from '../utils';

const useAuth = () => {
  const { library, chainId, active, activate, deactivate } = useWeb3React();

  const login = useCallback(async () => {
    await activate(injectedConnector);
    if (library && chainId !== parseInt(currentNetwork)) {
      const hasSetup = await setupNetwork();
      if (hasSetup) {
        await activate(injectedConnector);
      }
      else {
        toast.error("Unsupported Network. This platform is working on BSC Main Net");
      }
    }
  }, [activate, chainId, library]);

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return { login, logout };
};

export default useAuth;

