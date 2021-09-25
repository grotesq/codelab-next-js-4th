import useFetch from "../../hooks/useFetch";

export default function ArticleView({id}) {
    const {data, error} = useFetch(`${process.env.API_HOST}/articles/${id}`);
    if (error) {
        return <>데이터 로드에 실패했습니다.</>
    }
    return <div className="container">
        <h1>{data?.subject}</h1>
        <hr/>
        <p>{data?.content}</p>
    </div>
}
