import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css'

const App = ({ Component, pageProps }) => (
  <Layout>
    <Head>
      <title>Events</title>
      <meta name='description' content='All awesome events'></meta>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Component {...pageProps} />
  </Layout>
);

export default App;
