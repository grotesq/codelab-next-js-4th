import Layout from "../../../components/Layout";
import ArticleView from "../../../components/articles/ArticleView";
import {fetcher} from "../../../hooks/useFetch";
import { SWRConfig } from 'swr';
import isbot from 'isbot';

export default function ViewPage({ id, fallback } ) {
    return <SWRConfig value={{ fallback }}>
        <Layout>
            <ArticleView id={id}/>
        </Layout>
    </SWRConfig>
}

export const getServerSideProps = async ({req, params}) => {
    const id = params.id;
    const url = `${process.env.API_HOST}/articles/${id}`;
    const article = isbot(req.headers['user-agent']) ? await fetcher( url ) : null;
    return {
        props: {
            id,
            fallback: {
                [url]: article,
            }
        }
    }
}
