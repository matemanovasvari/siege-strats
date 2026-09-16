import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { strats } from "../data/strats";

const maps = [
  "Skyscraper",
  "Coastline",
  "Villa",
  "Clubhouse",
  "Consulate",
  "Bank",
  "Chalet",
  "Kafe",
  "Border",
  "Theme",
  "Fortress",
  "Nighthaven",
  "Lair",
  "Calypso",
];

const Main = () => {
  const [selectedMap, setSelectedMap] = useState(
    () => localStorage.getItem("selectedMap") || maps[0],
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedMap", selectedMap);
  }, [selectedMap]);

  const selectedMapStrats = strats.filter(
    (strat) => strat.map === selectedMap.toLowerCase(),
  );

  return (
    <div className="container">
      <div id="title">
        <img
          src="./src/assets/hero.png"
          alt="r6 logo"
          style={{ height: "125px", width: "125px" }}
        />
        <h1>Rainbow Six Siege Strats</h1>
      </div>

      <Row className="g-4" id="main" style={{ marginTop: "20px" }}>
        <Col xs={12} md={3}>
          <Row xs={2} className="g-3">
            {maps.map((map) => (
              <Col key={map}>
                <Card
                  className="h-100 text-white border-0"
                  onClick={() => setSelectedMap(map)}
                  style={{
                    cursor: "pointer",
                    minHeight: "100px",
                    backgroundImage: `url("/images/${map}MainImage.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Card.ImgOverlay
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <Card.Title
                      className="text-center mb-0"
                      style={{ fontSize: "large" }}
                    >
                      {map}
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={12} md={9}>
          <Card>
            <Card.Img
              src={`/images/${selectedMap}MainImage.png`}
              alt={`${selectedMap} map`}
            />

            <Card.ImgOverlay className="d-flex align-items-center justify-content-center flex-wrap gap-3">
              {selectedMapStrats.map((strat) => (
                <button
                  key={strat.url}
                  style={{
                    fontSize: "large",
                    border: "solid 1px white",
                    backgroundColor: "rgba(101, 100, 100, 0.2)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    backdropFilter: "blur(3px)",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/strats/${selectedMap.toLowerCase()}/${strat.url}`,
                    )
                  }
                >
                  {strat.name}
                </button>
              ))}
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
