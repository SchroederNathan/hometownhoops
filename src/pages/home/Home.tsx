import React from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import "./Home.css";
import { Link } from "react-router-dom";
import EmailList from "./EmailList";

interface Features {
  title: string;
  description: string;
  imageURL: string;
  routerURL: string;
}

const Home = () => {
  const featureCards: Features[] = [
    {
      title: "Tournaments",
      description:
        "Discover all the details about our upcoming basketball tournaments",
      imageURL: "src/assets/tournaments.jpg",
      routerURL: "/tournaments",
    },
    {
      title: "Travel Teams",
      description:
        "Discover how our travel teams can help develop your basketball skills and grow as a player",
      imageURL: "src/assets/camps.jpg",
      routerURL: "/travel-teams",
    },
    {
      title: "Rec Leagues",
      description:
        "Explore the fun and competitive world of our adult rec basketball leagues",
      imageURL: "src/assets/recleague.jpg",
      routerURL: "/rec-leagues",
    },
  ];

  return (
    <div className="main-div position-relative">
      <img src="src/assets/pattern.png" className="position-absolute top-0 end-0 pattern" />
      <div className="landing-background">
        <div className="container-fluid landing-container d-flex align-items-center">
          <div>
            <h1 className="display-3 fw-bold">Hometown Hoops</h1>
            <p className="mb-4 lead landing-text">
              A local organization bringing basketball to people of all ages and
              skill levels. 
            </p>
            <EmailList />
          </div>
        </div>
      </div>

      <Row
        xs={1}
        md={3}
        className="g-3 cards"
        style={{
          margin: "auto",
          maxWidth: "80%",
          height: "fit",
        }}
      >
        {featureCards &&
          featureCards.map((card) => {
            const { title, description, imageURL, routerURL } = card;
            return (
              <Col>
                <Link to={routerURL} style={{ textDecoration: "none" }}>
                  <Card
                    className="flex-fill shadow card"
                    style={{
                      width: "100%",
                      height: "25rem",
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      style={{
                        minHeight: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                      src={imageURL}
                    />
                    <Card.Body style={{ overflowY: "hidden" }}>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                    </Card.Body>
                    <Button variant="primary" style={{ margin: "10px" }}>
                      Find {title}
                    </Button>
                  </Card>
                </Link>
              </Col>
            );
          })}
      </Row>
      <div
        id="about-us"
        style={{ maxWidth: "80%", margin: "auto", padding: "20px" }}
      >
        <hr className="featurette-divider" />
      </div>
      <div
        className="row featurette feature"
        style={{
          width: "70%",
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="col-md-7">
          <h2 className="featurette-heading fw-normal lh-1">About Us</h2>
          <p className="lead">
            Hometown Hoops was founded by Derek Bedal who saw a need for more
            opportunities to play basketball in the Leamington and surrounding
            areas. His idea started with a tournament in 2021. This idea then
            grew to not only host tournaments but to also include a recreational
            summer league for young adults the next summer. Derek plans to grow
            his business to include skill development camps for elementary and
            high school age players. Derek’s love of basketball began as a young
            boy and grew as he competed on multiple levels in high school.
            During this time he spent many summers attending various basketball
            camps such as PGC, Breakthrough Basketball, and others. Derek
            attended these camps to constantly grow his basketball IQ and his
            basketball skills. He hopes his love of the game will spread
            throughout the local communities as he provides multiple
            opportunities.
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="shadow-sm bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            style={{ minHeight: "500px", objectFit: "cover" }}
            height="500"
            role="img"
            src="src/assets/portrait.jpg"
          ></img>
        </div>
      </div>

      <div style={{ maxWidth: "80%", margin: "auto", padding: "10px" }}>
        <hr className="featurette-divider" />
      </div>

      <h2 style={{ width: "70%", margin: "auto", textAlign: "center" }}>
        Our Sponsor's
      </h2>
      <p
        className="text-body-secondary"
        style={{ width: "70%", margin: "auto", textAlign: "center" }}
      >
        We are incredibly grateful for the support of our sponsor's that help
        make Hometown Hoops a success.
      </p>

      <div style={{ width: "70%", margin: "auto", textAlign: "center" }}>
        <img
          src="src/assets/sponsor1.png"
          width={200}
          height={200}
          style={{ padding: "10px" }}
        />
        <img
          src="src/assets/sponsor2.png"
          width={200}
          height={200}
          style={{ padding: "10px" }}
        />
        <img
          src="src/assets/sponsor3.png"
          width={200}
          height={200}
          style={{ padding: "10px" }}
        />
        <img
          src="src/assets/sponsor4.png"
          width={200}
          height={200}
          style={{ padding: "10px" }}
        />
        <img
          src="src/assets/sponsor5.png"
          width={200}
          height={200}
          style={{ padding: "10px" }}
        />
      </div>
    </div>
  );
};

export default Home;
