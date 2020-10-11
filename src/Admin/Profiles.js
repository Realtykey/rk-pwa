import React, { useState, useEffect } from 'react'
import { Table, Tag, Space } from 'antd';
import { Modal, Button } from 'antd';
import {ProfileFilled} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import {fetch} from './firebase';

const data = [
    {
        key: '1',
        name: 'John Brown',
        phone: 32,
        ci: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        phone: 42,
        ci: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        phone: 32,
        ci: 'Sidney No. 1 Lake Park',
    },
];

const root = {
    minHeight: '100vh',
    background: 'white'
}

const tab = {
    padding :'20px 40px 0 40px',
}
const Profiles = () => {
    const [visible, setVisible] = useState(false);
    const [profile,setProfile] = useState(null);
    const [profiles,setProfiles] = useState([]);

    useEffect(() => {
        const init = async () => {
            const { db } = await import('../base');
    
            const snap = await db.collection('users').get();

            const profiles = snap.docs.map(
                (profile,index) => {
                    return {...profile.data(),key:index};
                }
            );
            console.log(profiles);
            setProfiles(profiles);
        }        

        init();

    }, [])

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Número',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Cédula',
            dataIndex: 'ci',
            key: 'ci',
        },
        {
            title: 'Controles',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={showModal}>Revisar</Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false);
    };

    return (
        <div style={root}>
            <Table style={tab} columns={columns} dataSource={profiles} />
            <Modal
                title="Comentarios de "
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}
export default Profiles;
