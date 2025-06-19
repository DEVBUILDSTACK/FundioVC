import type {PrivyClientConfig} from '@privy-io/react-auth';

export const privyConfig: PrivyClientConfig = {
  loginMethods: ['google',"email"],
  appearance: {
    theme:"dark",
  },
};