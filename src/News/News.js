import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import NewsList from './NewsList';
import NewsForm from './NewsForm';
import { db } from '../base';


export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await db.collection('news').orderBy("date","desc").get();
      const news = result.docs.map(
        doc => {
          return doc.data();
        }
      );
      setNews(news);
    }

    const unsubscribe = db.collection('news').onSnapshot(
      () => init()
    );

    init();

    return unsubscribe;

  }, [])

  const root = {
    height: '100vh',
    background: 'white',
    paddingTop: 20,
  }

  return (
    <div style={root}>
      <Row justify="center">
        <Col xs={22} sm={22} md={10}>
          <NewsForm />
        </Col>
        <Col xs={2} sm={2} md={2}>
        </Col>
        <Col xs={22} sm={22} md={10}>
          <NewsList listData={news} />
        </Col>
      </Row>
    </div>
  );
}
