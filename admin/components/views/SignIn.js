import {Button} from "antd";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import firebaseApp from '../../net/firebaseApp';
import {useRouter} from "next/router";

export default function SignIn() {
    const router = useRouter();
    return(
        <div className="flex justify-center items-center h-screen">
            <Button onClick={() => {
                const auth = getAuth( firebaseApp );
                const provider = new GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                signInWithPopup( auth, provider )
                    .then( result => {
                        const { email } = result.user;
                        switch( email ) {
                            case "codelab@grotesq.com":
                                break;
                            default:
                                alert( '관리자만 로그인 할 수 있습니다.' );
                        }
                    } )
                    .catch( console.warn );
            }}>로그인</Button>
        </div>
    )
}
