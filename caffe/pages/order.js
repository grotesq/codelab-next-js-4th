import Header from '../components/Header';
import { Fragment, useState, useMemo } from 'react';
import Head from 'next/head';

const formatter = Intl.NumberFormat( 'ko-KR' );

const data = [
  { name: '오늘의 커피', price: 2500 },
  { name: '에스프레소', price: 2800 },
  { name: '아메리카노', price: 3000 },
  { name: '카페라떼', price: 3500 },
  { name: '카페모카', price: 3800 },
];

// 상태 state
export default function Order() {
  // [ 읽기전용, 쓰기전용 ] = useState( 기본값 );
  const [ selected, setSelected ] = useState( [] );

  const sum = useMemo(
    () => selected.reduce( ( previousValue, item ) => previousValue + item.price, 0 ),
    [ selected ]
  );
  
  return (
    <div className="container">
      <Head>
          <title>주문하기 - Caffe : 온라인 커피 주문</title>
      </Head>

      <Header />

      <h1 className="font-bold">Order</h1>

      <h2 className="text-xl font-bold">메뉴판</h2>

      <dl>
      {
        data.map( element => (
          <Fragment key={ element.name }>
            <dt>{ element.name }</dt>
            <dd>
              { formatter.format( element.price ) }원
              <small>
                <button onClick={ () => {
                  if( selected.includes( element ) ) {
                    setSelected( selected.filter( item => item !== element ) );
                  }
                  else {
                    setSelected( [ ...selected, element ] ); // { name: '에스프레소', price: 2800 }
                  }
                }}>
                  [ { selected.includes( element ) ? '선택 해제' : '선택' } ]
                </button>
              </small>
            </dd>
          </Fragment>
        ) )
      }
      </dl>

      <hr />

      <h2 className="text-xl font-bold">주문서</h2>

      <ul className="list-unstyled">
        { selected.map( item => <li key={ item.name }>{ item.name }</li> ) }
      </ul>

      합계 : { formatter.format( sum ) }원

      <div className="mt-4">
        <button className="btn btn-primary btn-lg" onClick={() => {
          confirm( `주문 합계는 ${formatter.format( sum )}원입니다. 주문하시겠습니까?` )
        }}>
          주문하기
        </button>
      </div>
    </div>
  )
}
