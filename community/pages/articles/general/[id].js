import Layout from "../../../components/Layout";
import ArticleView from "../../../components/articles/ArticleView";
import {useRouter} from "next/router";

export default function ViewPage( { id }) {
    return <Layout>
        <ArticleView id={id}/>
    </Layout>
}

export const getServerSideProps = ({params}) => {
    return {
        props: {
            id: params.id,
        }
    }
}
