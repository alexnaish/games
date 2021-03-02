import Head from 'next/head';
import { AnimateSharedLayout } from "framer-motion"

import '@styles/variables.css'
import '@styles/globals.css'

function Application({ Component, pageProps }) {
  return (
		<AnimateSharedLayout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgo=" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap" rel="stylesheet" />
			</Head>
			<Component {...pageProps} />
		</AnimateSharedLayout>
	);
}

export default Application
