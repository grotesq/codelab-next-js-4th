import Link from 'next/link';
import useFetch from "../../hooks/useFetch";

export default function ArticleList({title, category}) {
    const {data, error} = useFetch(`${process.env.API_HOST}/articles?category=${category}`);
    if( error ) {
        return <>데이터를 불러올 수 없습니다.</>
    }

    return (
        <div className="container">
            <h1>{title}</h1>

            <ul className="list-unstyled">
                {data?.data.map( article => (
                    <li key={article.id.toString()} className="flex flex-row">
                        <span className="mr-4">{ article.id }</span>
                        <Link href={`/articles/${category}/${article.id}`}>
                            <a>{article.subject}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end">
                <Link href={`/articles/${category}/create`}>
                    <a className="btn btn-primary">글 작성하기</a>
                </Link>
            </div>
        </div>
    )
}
