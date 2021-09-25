import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from "next/router";

export default function ArticleForm({category}) {
    const router = useRouter();
    return (
        <div className="container">
            <h1>글 작성하기</h1>

            <Formik
                initialValues={{
                    subject: '',
                    content: '',
                }}
                validate={values => {
                    const errors = {}
                    if (!values.subject) {
                        errors.subject = '제목은 필수 입력항목입니다.';
                    } else if (!values.content) {
                        errors.content = '내용은 필수 입력항목입니다.';
                    }
                    return errors;
                }}
                onSubmit={values => {
                    axios.post(`${process.env.API_HOST}/articles`, {
                        ...values,
                        category,
                    })
                        .then(() => {
                            router.back();
                        })
                        .catch(error => {
                            console.warn(error);
                            alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다.');
                        })
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">제목</label>
                            <input type="text" className="form-control"
                                   id="subject"
                                   name="subject"
                                   value={values.subject}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.subject && touched.subject && errors.subject}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">내용</label>
                            <textarea name="content" id="content" cols="30" rows="10" className="form-control"
                                      value={values.content}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.content && touched.content && errors.content}</p>
                        </div>
                        <button type="submit" className="btn btn-primary">전송</button>
                    </form>
                )}
            </Formik>

        </div>
    )
}
