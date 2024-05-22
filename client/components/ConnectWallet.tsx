import React from 'react';
import { ConnectButton } from '@/providers/ThirdwebProvider';
import { chain, client } from '@/lib/thirdweb';

const ConnectWallet = () => {
  return (
    <div className='fixed top-6 right-6'>
      <ConnectButton client={client} chain={chain} connectButton={{
        style: {
            backgroundColor: 'rgb(30 64 175)',
            color: '#ffffff'
        }
      }}>
      </ConnectButton>
    </div>
  );
}
export default ConnectWallet;
