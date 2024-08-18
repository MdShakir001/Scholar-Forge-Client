import React from 'react'
import { Card, Col } from 'react-bootstrap'

const ArticleCard = ({article}) => {
  return (
    <Col key={article.id} className='mb-1' >
        <Card className='p-2'>
            <Card.Title className='project-color'>{article.title}</Card.Title>    
        </Card>
    </Col>
  )
}

export default ArticleCard
