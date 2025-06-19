import { base, baseSepolia, mainnet, sepolia } from 'viem/chains';
import { http } from 'wagmi';

import { createConfig } from '@privy-io/wagmi';


export const config = createConfig({
  chains: [mainnet, base,baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});