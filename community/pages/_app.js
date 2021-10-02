import Head from 'next/head';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../styles/globals.css'
import {useAtom} from "jotai";
import authAtom from "../stores/authAtom";
import {useEffect} from "react";

function MyApp({Component, pageProps}) {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const [, setAuth] = useAtom(authAtom);
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    useEffect(() => {
        if (token) {
            setAuth(auth => ({...auth, token}))
            axios.get(`${process.env.API_HOST}/me`)
                .then(response => setAuth(auth => ({...auth, user: response.data})))
                .catch(() => {
                })
                .finally(() => setAuth(auth => ({...auth, loaded: true})))
        } else {
            setAuth(auth => ({...auth, loaded: true}))
        }
    }, [])

    return <>
        <Head>
            <title>Codelab Community</title>
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
