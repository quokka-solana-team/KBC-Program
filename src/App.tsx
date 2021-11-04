
import { useMemo } from 'react';

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import Purpose from './views/purpose';

import './style/bootstrap.css';
import './App.css';
import './style/font-icons.css';
import './style/animate.css';
import './style/fonts.css';
import './style/custom.css';
import { SPLTokenListProvider } from './contexts/TokenList';
import { MetaProvider } from './contexts/meta/meta';

const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet()],
    [],
  );

  return (
    <HashRouter basename={'/'}>
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <SPLTokenListProvider>
          <WalletProvider wallets={wallets} autoConnect>
            <MetaProvider>
              <WalletModalProvider logo="images/logo.png" featuredWallets={4}>
                <Switch>
                  <Route path="/purpose" component={() => <Purpose />} />
                  <Route path="/" component={() => <Home />} />
                </Switch>
              </WalletModalProvider>
            </MetaProvider>
          </WalletProvider>
        </SPLTokenListProvider>
      </ConnectionProvider>
    </ThemeProvider>
    </HashRouter>
  );
};

export default App;
