import Layout from "../../../components/Layout";
import ArticleList from "../../../components/articles/ArticleList";
import {fetcher} from "../../../hooks/useFetch";
import {SWRConfig} from "swr";

export default function GeneralArticles({page, fallback}) {
    return (
        <SWRConfig value={{ fallback }}>
            <Layout>
                <ArticleList title="일반 게시판" category="general" page={page} />
            </Layout>
        </SWRConfig>
    )
}

export const getServerSideProps = async ({query}) => {
    const page = query.page || 1;
    const url = `${process.env.API_HOST}/articles?category=general&page=${page}`;
    const data = await fetcher(url);
    return {
        props: {
            page,
            fallback: {
                [url] : data,
            }
        }
    }
}
