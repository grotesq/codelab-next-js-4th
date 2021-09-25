import Layout from "../../../components/Layout";
import ArticleList from "../../../components/articles/ArticleList";

export default function AskArticles() {
    return (
        <Layout>
            <ArticleList title="질문 게시판" category="ask" />
        </Layout>
    )
}
