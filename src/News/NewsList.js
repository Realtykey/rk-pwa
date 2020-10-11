import React from 'react';
import { List } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Item from './Item';

export default function NewsList({listData}) {


  return (
    <div>
      <List
        bordered
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        renderItem={item => (<Item item={item} />)}
      />
    </div>
  );
}