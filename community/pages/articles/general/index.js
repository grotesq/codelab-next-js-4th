import Layout from "../../../components/Layout";
import ArticleList from "../../../components/articles/ArticleList";
import {fetcher} from "../../../hooks/useFetch";
import {SWRConfig} from "swr";

export default function GeneralArticles({fallback}) {
    return (
        <SWRConfig value={{ fallback }}>
            <Layout>
                <ArticleList title="일반 게시판" category="general" />
            </Layout>
        </SWRConfig>
    )
}

export const getServerSideProps = async () => {
    const url = `${process.env.API_HOST}/articles?category=general`;
    const data = await fetcher(url);
    return {
        props: {
            fallback: {
                [url] : data,
            }
        }
    }
}
