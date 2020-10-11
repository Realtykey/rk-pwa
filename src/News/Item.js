import React from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {remove} from './firebase';
// {
//     href: '#',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//     photo:''
// }

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export default function Item({item}) {
    return (
        <List.Item
            key={item.title}
            actions={[
                <a onClick={() => remove(item.id)}>
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,

                </a>
            ]}
            extra={
                item.photo && <img
                    width={272}
                    alt="logo"
                    src={item.photo}
                />
            }
        >
            <List.Item.Meta
                avatar={<Avatar src={item.user.photoUrl} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
            />
            {item.content}
        </List.Item>
    )
}