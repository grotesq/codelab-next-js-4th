import Head from 'next/head';
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
    return <>
        <Head>
            <link
                href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
                rel="stylesheet"/>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
                crossOrigin="anonymous"/>
        </Head>
        <Component {...pageProps} />
    </>
}

export default MyApp
