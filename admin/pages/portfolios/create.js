import BaseLayout from "../../components/containers/BaseLayout";
import {Button, Form, Input} from 'antd';
import firebaseApp from "../../net/firebaseApp";
import {addDoc, collection, getFirestore} from 'firebase/firestore/lite'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {useRouter} from "next/router";
import uid from 'tiny-uid';
import {DateTime} from "luxon";
import {useState} from "react";

export default function PortfolioForm() {
    const [form] = Form.useForm();
    const router = useRouter();
    const [thumbnail, setThumbnail] = useState(null);
    return (
        <BaseLayout>
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    const firestore = getFirestore(firebaseApp);
                    const porfolios = collection(firestore, 'portfolios');
                    addDoc(porfolios, {
                        ...values,
                        thumbnail,
                        created_at: new Date(),
                        updated_at: new Date(),
                    })
                        .then(() => router.back())
                        .catch(console.warn);
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
                        setThumbnail( url );
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">전송</Button>
                </Form.Item>
            </Form>
        </BaseLayout>
    )
}
