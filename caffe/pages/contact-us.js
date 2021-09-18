import { useState } from 'react';
import Header from '../components/Header';

export default function ContactUs() {
    const [ email, setEmail ] = useState( '' );
    const [ subject, setSubject ] = useState( '' );
    const [ content, setContent ] = useState( '' );
  const handleSubmit = (event) => {
      event.preventDefault();
    
      console.log( 'input data', email, subject, content );
  }
  return (
    <div className="container">

      <Header />

      <h1 className="font-bold">Contact Us</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">이메일</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                value={ email }
                onChange={ event => setEmail( event.target.value ) }
            />
        </div>
        <div className="mb-3">
            <label htmlFor="subjectInput" className="form-label">제목</label>
            <input type="text" name="subject" className="form-control" id="subjectInput" placeholder="제목을 입력하세요"
                value={ subject }
                onChange={ event=> setSubject( event.target.value ) }
            />
        </div>
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">내용</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                value={ content }
                onChange={ event=> setContent( event.target.value ) }
            />
        </div>
        <button className="btn btn-primary btn-lg">문의하기</button>
      </form>
    </div>
  )
}
