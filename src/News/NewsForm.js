import React from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useSelector } from 'react-redux'
import {create} from './firebase';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function NewsForm() {
    const [form] = Form.useForm();
    const {currentUser,userData} = useSelector(state => state.general);

    const submit = async values => {

        try {

            await create(values, currentUser, userData);

        } catch (e) {
            console.log(e);
        }

        form.resetFields();
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={submit}>
            <Form.Item name="title" label="Título" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            {/* // user photoUrl */}
            <Form.Item name="description" label="Descripción" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="content" label="Contenido" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            {/* img picker */}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Guardar
            </Button>
            </Form.Item>
        </Form>
    );
};