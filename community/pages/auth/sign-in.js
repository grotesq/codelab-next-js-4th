import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from "next/router";
import Cookies from "universal-cookie";
import {useAtom} from "jotai";
import authAtom from "../../stores/authAtom";

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

/*
    // 요청시 헤더 설정
    axios.get( 'url', {
        headers: {
            Authorization: 'Bearer TOKEN_HERE'
        }
    } );
    axios.post( 'url', { ...params }, {
        headers: {
            Authorization: 'Bearer TOKEN_HERE'
        }
    } )
    // 전역 헤더 설정
    axios.defaults.headers.common.Authorization = 'Bearer TOKEN_HERE';

    // 상태
    useState()

    // 전역 상태
    ????
 */

export default function SignIn() {
    const router = useRouter();
    const [, setAuth] = useAtom(authAtom);
    return (
        <div className="container">
            <h1>로그인</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = '이메일은 필수 입력 항목입니다.';
                    } else if (!emailRegExp.test(values.email)) {
                        errors.email = '이메일 형식이 올바르지 않습니다.';
                    } else if (!values.password) {
                        errors.password = '비밀번호는 필수 입력 항목입니다.';
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);
                    axios.post(process.env.API_HOST + '/auth/sign-in', values)
                        .then(response => {
                            const cookies = new Cookies();
                            const token = response.data.token.token;
                            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                            cookies.set('token', token, {path: '/'});
                            setAuth(auth => ({...auth, token}));
                            router.push(router.query.ref ?? '/me');
                        })
                        .catch(error => {
                            console.warn(error);
                            alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다.');
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailInput"
                                   placeholder="name@example.com"
                                   name="email"
                                   value={values.email}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.email && touched.email && errors.email}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input type="password" className="form-control" id="passwordInput"
                                   placeholder="Password"
                                   name="password"
                                   value={values.password}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                            />
                            <p className="text-danger mt-2">{errors.password && touched.password && errors.password}</p>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                {isSubmitting ? '로그인 중...' : '로그인'}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}
