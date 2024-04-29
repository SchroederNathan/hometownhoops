import React from 'react'
import { Button, Card, CardGroup, Carousel, Col, Row } from 'react-bootstrap'
import './Home.css'
import CarosoulComponent from '../components/Carosoul/Carosoul'

interface Features {
  title: string;
  description: string;
  imageURL: string;
  routerURL: string;
}

const home = () => {

  const featureCards: Features[] = [{
    title: 'Tournaments',
    description: 'Discover all the details about our upcoming basketball tournaments',
    imageURL: 'src/assets/tournaments.jpg',
    routerURL: ''
  },
  {
    title: 'Camps',
    description: 'Discover how our camps can help your child develop their basketball skills and grow as a player and a person!',
    imageURL: 'src/assets/camps.jpg',
    routerURL: ''
  },
  {
    title: 'Rec Leagues',
    description: 'Explore the fun and competitive world of our adult rec basketball leagues!',
    imageURL: 'src/assets/recleague.jpg',
    routerURL: ''
  }]


  return (
    <div >
      <div className='carosel' style={{ display: 'block', width: '100%' }}>
        <Carousel>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              alt="Image One"
            />
            <Carousel.Caption>
              <h3>Label for first slide</h3>
              <p>Sample Text for Image One</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              className="d-block w-100"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
              alt="Image Two"
            />
            <Carousel.Caption>
              <h3>Label for second slide</h3>
              <p>Sample Text for Image Two</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <Row xs={1} md={3} className="g-3" style={{margin: '25px'}}>
        {featureCards &&
          featureCards.map((card) => {
            const { title, description, imageURL, routerURL } =
              card;
            return (
              <Col>
                <Card className="flex-fill" style={{width: '100%', height: '25rem', textAlign: 'center', margin: 'auto'}}>
                  <Card.Img variant="top" style={{height: '200px', objectFit: 'cover'}} src={imageURL} />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                  </Card.Body>
                  <Button variant="primary" style={{margin: '10px'}}>Find {title}</Button>

                </Card>
              </Col>
            );
          })}
      </Row>
    </div>
  )
}

export default home