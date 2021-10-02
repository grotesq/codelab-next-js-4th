import BaseLayout from "../../components/containers/BaseLayout";
import {Button} from "antd";
import Link from 'next/link';
import {useEffect, useState} from "react";
import firebaseApp from "../../net/firebaseApp";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import {DateTime} from "luxon";

function Item( { portfolio }) {
    return (
        <li className="flex flex-row items-center py-2 border-b">
            <div className="flex w-16 justify-center">
                <img src={portfolio.thumbnail} className="max-w-16 max-h-16"/>
            </div>
            <div className="flex-1 mx-2">
                <Link href={`/portfolios/${portfolio.id}`}>
                    <a>{portfolio.subject}</a>
                </Link>
            </div>
            <div>
                {DateTime.fromSeconds(portfolio.created_at.seconds).toFormat('yyyy-LL-dd')}
            </div>
        </li>
    )
}

export default function PortfolioList() {
    const [portfolios, setPortfolios] = useState([]);
    useEffect(()=>{
        const firestore = getFirestore( firebaseApp );
        const portfolios = collection( firestore, 'portfolios' ); //.orderBy( 'created_at', 'desc' );
        getDocs( portfolios ).then( snapshot => {
            setPortfolios(
                snapshot.docs
                    .map( doc => ({ id: doc.id, ...doc.data() }) )
                    .sort( ( x, y ) => x.created_at.seconds < y.created_at.seconds ? 1 : -1 )
            );
        } );
    },[])
    return (
        <BaseLayout>
            <ul>
                { portfolios.map( portfolio => ( <Item key={portfolio.id} portfolio={portfolio} /> ))}
            </ul>

            <div className="flex flex-row justify-end">
                <Link href="/portfolios/create">
                    <Button>추가</Button>
                </Link>
            </div>
        </BaseLayout>
    )
}
