import { FC } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'sonner';

import ThemeContextProvider from '@/context/theme-context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </BrowserRouter>
      <Toaster richColors closeButton />
    </>
  );
};

export default Providers;
