import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/CryptoApi';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl = 'https://www.bing.com/th?id=OVFT.C6d_ep1z8oQhcg3WngBG3y&pid=News'

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })

  if (!cryptoNews?.value) return 'loding';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (<Col span={24}>
        <Select
          showSearch
          className='select-news'
          placeholder='select a cryptocurrency'
          optionFilterProp='children'
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Option value='Cryptocurrency'>Cryptocurrency</Option>
          {data?.data?.coins.map((coin) => (<Option value={coin.name}>{coin.name}</Option>))}
        </Select>
      </Col>)}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} traget="_blank" rel="nonreferrer">
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} />

              </div>
              <p>{news.description > 100 ? `${news.description.substring(0, 100)}` : news.description}</p>

              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} />
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>

            </a>

          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News