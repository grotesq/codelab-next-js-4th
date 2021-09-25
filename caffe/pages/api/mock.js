export default function handler(req, res) {
    res.status(200).json( {
        meta: {
            currentPage: 1,
            totalPage: 10
        },
        posts: [
            { id: '1', subject: 'subject', content: 'content' }
        ]
    } )
}
