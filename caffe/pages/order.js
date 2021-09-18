import Header from '../components/Header';
import { useState } from 'react';

// document.querySelector( 'button' ).addEventListener( 'click', event => {
//   // 변수 제어
//   // DOM 제어
//   document.querySelector( '#espresso button' ).innerHTML = '선택 해제';
// } );

// 상태 state
export default function Order() {
  // [ 읽기전용, 쓰기전용 ] = useState( 기본값 );
  const [ hasEspresso, setEspresso ] = useState( false );

  return (
    <div className="container">

      <Header />

      <h1 className="font-bold">Order</h1>

      <h2 className="text-xl font-bold">메뉴판</h2>

      <dl>
        <dt>에스프레소</dt>
        <dd>
          2,800원
          <small>
            <button onClick={ () => setEspresso( !hasEspresso ) }>
              [ { hasEspresso ? '선택 해제' : '선택' } ]
            </button>
          </small>
        </dd>

        <dt>
          아메리카노
        </dt>
        <dd>
          3,000원
          <small><button>[ 선택 ]</button></small>
        </dd>

        <dt>
          카페라떼
        </dt>
        <dd>
          3,500원
          <small><button>[ 선택 ]</button></small>
        </dd>
      </dl>

      <hr />

      <h2 className="text-xl font-bold">주문서</h2>

      <ul className="list-unstyled">
        { hasEspresso && <li>에스프레소</li> }
      </ul>

      합계 : { '0' }원

      <div className="mt-4">
        <button className="btn btn-primary btn-lg">주문하기</button>
      </div>
    </div>
  )
}
