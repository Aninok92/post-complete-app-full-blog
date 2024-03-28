import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
