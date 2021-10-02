import {Button, Form, Input} from "antd";
import {useRouter} from "next/router";
import {useState} from "react";
import BaseLayout from "../containers/BaseLayout";
import {addDoc, collection, deleteDoc, doc, getFirestore, updateDoc} from "firebase/firestore/lite";
import firebaseApp from "../../net/firebaseApp";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {DateTime} from "luxon";
import uid from "tiny-uid";

export default function PortfolioForm({id, portfolio}) {
    const [form] = Form.useForm();
    const router = useRouter();
    const [thumbnail, setThumbnail] = useState(portfolio?.thumbnail || null);
    return (
        <BaseLayout>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    subject: portfolio?.subject || '',
                    content: portfolio?.content || '',
                }}
                onFinish={(values) => {
                    const firestore = getFirestore(firebaseApp);
                    const porfolios = collection(firestore, 'portfolios');
                    if (!id) {
                        addDoc(porfolios, {
                            ...values,
                            thumbnail,
                            created_at: new Date(),
                            updated_at: new Date(),
                        })
                            .then(() => router.back())
                            .catch(console.warn);
                    }
                    else {
                        const docRef = doc( firestore, 'portfolios', id )
                        updateDoc( docRef, {
                            ...values,
                            thumbnail,
                            updated_at: new Date(),
                        } )
                            .then(() => router.back())
                            .catch(console.warn);
                    }
                }}
            >
                <Form.Item label="대표 이미지">
                    <input type="file" onChange={async event => {
                        if (event.target.files.length === 0) return;
                        const storage = getStorage(firebaseApp);
                        const file = event.target.files[0];
                        const dir = DateTime.now().toFormat('yy/LL/');
                        const split = file.name.split('.');
                        const savedPath = `/${dir}${encodeURIComponent(split[0])}-${uid()}.${split[1]}`;
                        const fileRef = ref(storage, savedPath);
                        await uploadBytes(fileRef, file)
                        const url = await getDownloadURL(fileRef);
                        setThumbnail(url);
                    }}/>
                    {thumbnail && (
                        <img src={thumbnail} style={{maxWidth: 200, maxHeight: 200}}/>
                    )}
                </Form.Item>
                <Form.Item label="제목" required name="subject">
                    <Input/>
                </Form.Item>
                <Form.Item label="설명" required name="content">
                    <Input.TextArea/>
                </Form.Item>
                <div className="flex flex-row justify-between">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">전송</Button>
                    </Form.Item>
                    {id && (
                        <Form.Item>
                            <Button type="danger" onClick={async () => {
                                if( !confirm( '삭제하시겠습니까?' ) ) return;
                                const firestore = getFirestore(firebaseApp);
                                const docRef = doc( firestore, 'portfolios', id );
                                await deleteDoc( docRef )
                                router.back();
                            }}>삭제</Button>
                        </Form.Item>
                    )}
                </div>
            </Form>
        </BaseLayout>
    )
}
