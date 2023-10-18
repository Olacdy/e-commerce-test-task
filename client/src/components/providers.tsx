import { FC } from 'react';

import { HashRouter } from 'react-router-dom';

import { Toaster } from 'sonner';

import ThemeContextProvider from '@/context/theme-context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <HashRouter>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </HashRouter>
      <Toaster richColors closeButton />
    </>
  );
};

export default Providers;
