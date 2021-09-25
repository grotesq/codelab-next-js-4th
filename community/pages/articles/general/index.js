import Layout from "../../../components/Layout";
import ArticleList from "../../../components/articles/ArticleList";

export default function GeneralArticles() {
    return (
        <Layout>
            <ArticleList title="일반 게시판" category="general" />
        </Layout>
    )
}
