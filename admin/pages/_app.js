import 'antd/dist/antd.css';
import Head from 'next/head';

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <title>Admin Page</title>
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
