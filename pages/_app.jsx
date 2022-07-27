import Head from 'next/head';
import '../styles/globals.css';
import '../styles/directus.css';
import { motion } from 'framer-motion';
import Header from '../components/Header';

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>Next.js + Directus</title>
      </Head>
      <Header></Header>
      <motion.div
        key={router.route}
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </>
  );
}

export default MyApp;
