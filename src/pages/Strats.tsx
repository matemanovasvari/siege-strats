import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { strats } from "../data/strats";
import type { Operator } from "../types/Operator";

const Strats = () => {
  const { map, strat } = useParams();
  const navigate = useNavigate();

  const selectedStrat = strats.find(
    (item) => item.map === map && item.url === strat,
  );

  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    localStorage.getItem("selectedOperator")
      ? JSON.parse(localStorage.getItem("selectedOperator")!)
      : null,
  );

  useEffect(() => {
    localStorage.setItem("selectedOperator", JSON.stringify(selectedOperator));
  }, [selectedOperator]);

  if (!selectedStrat) {
    return (
      <Container className="py-5 text-center">
        <h1>Strategy not found</h1>

        <Button
          variant="outline-light"
          onClick={() => navigate("/")}
          className="mt-3"
        >
          ← Back to maps
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-light" onClick={() => navigate("/")}>
          ← Back
        </Button>

        <div className="flex-grow-1 text-center">
          <div className="text-secondary">
            {selectedStrat.map.toUpperCase()}
          </div>

          <h1 className="mb-0">{selectedStrat.name}</h1>
        </div>

        <div style={{ width: "90px" }} />
      </div>

      <Row className="g-3">
        {selectedStrat.operators.map((operator) => (
          <Col key={operator.name} xs={6} sm={4} md={3} lg={2}>
            <Card
              className={`h-100 text-white ${
                selectedOperator?.name === operator.name
                  ? "border-primary"
                  : "border-secondary"
              }`}
              onClick={() => setSelectedOperator(operator)}
              style={{
                cursor: "pointer",
                backgroundColor: "#1c2026",
              }}
            >
              <Card.Body className="d-flex align-items-center justify-content-center text-center">
                <Card.Title className="mb-0">{operator.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedOperator && (
        <div className="mt-5">
          <div className="text-center mb-3">
            <h2>
              {selectedOperator.name} - {selectedOperator.role}
            </h2>
          </div>

          <Carousel interval={null}>
            {selectedOperator.images.map((image, index) => (
              <Carousel.Item key={image}>
                <div
                  style={{
                    height: "600px",
                    backgroundColor: "#111418",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={image}
                    alt={`${selectedOperator.name} strategy ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </Container>
  );
};

export default Strats;
