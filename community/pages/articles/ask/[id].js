import Layout from "../../../components/Layout";
import ArticleView from "../../../components/articles/ArticleView";
import {fetcher} from "../../../hooks/useFetch";
import { SWRConfig } from 'swr';

export default function ViewPage( { id, fallback } ) {
    return <SWRConfig value={{ fallback }}>
        <Layout>
            <ArticleView id={id}/>
        </Layout>
    </SWRConfig>
}

export const getServerSideProps = async ({params}) => {
    const id = params.id;
    const url = `${process.env.API_HOST}/articles/${id}`;
    const article = await fetcher( url );
    return {
        props: {
            id: params.id,
            fallback: {
                [url] : article,
            }
        }
    }
}
