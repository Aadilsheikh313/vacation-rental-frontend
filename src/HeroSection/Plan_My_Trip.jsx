import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { fetchTripInfo } from "../api/mytripApi.js";
import MapView from "../Map/MapView.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import styles from "../stylesModule/HeroModule/PlanMyTrip.module.css";

export default function PlanMyTrip() {
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  }


  // Convert UNIX timestamp + timezone offset to HH:MM format
  function unixToTime(unixTimestamp, timezoneOffsetSeconds) {
    if (!unixTimestamp) return "N/A";
    const date = new Date((unixTimestamp + timezoneOffsetSeconds) * 1000);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }

  // Helper to get wind direction from degrees
  function getWindDirection(deg) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  }

  // Find forecast for a particular date from weather list
  function getWeatherForDate(weatherList, targetDate) {
    if (!targetDate) return null;
    const target = new Date(targetDate);
    const forecast = weatherList.find(item => {
      const itemDate = new Date(item.dt_txt);
      return (
        itemDate.getFullYear() === target.getFullYear() &&
        itemDate.getMonth() === target.getMonth() &&
        itemDate.getDate() === target.getDate()
      );
    });
    return forecast || null;
  }

  async function handleSearch(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const resp = await fetchTripInfo({ q: trip.destination, radius: 5000, limit: 12 });
      setData(resp);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className={styles.container + " py-4"}>
      <h2 className={styles.title}>Plan My Trip</h2>

      <Form onSubmit={handleSearch} className={styles.formRow}>
        <Row className="g-3">
          <Col md={3}>
            <Form.Control
              name="destination"
              placeholder="Destination"
              value={trip.destination}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Col>
          {/* <Col md={2}>
            <Form.Control
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Col> */}
          {/* <Col md={2}>
            <Form.Control
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleChange}
              required
              className={styles.formControl}
            />
          </Col> */}
          {/* <Col md={2}>
            <Form.Control
              type="number"
              name="adults"
              min="1"
              value={trip.adults}
              onChange={handleChange}
              placeholder="Adults"
              className={styles.formControl}
            />
          </Col> */}
          {/* <Col md={2}>
            <Form.Control
              type="number"
              name="children"
              min="0"
              value={trip.children}
              onChange={handleChange}
              placeholder="Children"
              className={styles.formControl}
            />
          </Col> */}
          <Col md={1}>
            <Button type="submit" variant="primary" className={styles.buttonSearch + " w-100"}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {loading && <div className="text-center"><Spinner animation="border" /></div>}
      {error && <Alert variant="danger">{error}</Alert>}

      {data && data.currentWeather && (
        <>
          <Card className={styles.mainWeatherCard}>
            <Row className="align-items-center">
              <Col md={5} className={styles.weatherSummary}>
                <h4>{data.currentWeather.name}, {data.currentWeather.sys?.country}</h4>
                <div className={styles.temperature}>
                  <img
                    src={`https://openweathermap.org/img/wn/${data.currentWeather.weather?.[0]?.icon}@4x.png`}
                    alt={data.currentWeather.weather?.[0]?.description}
                  />
                  <div>
                    <h1>{Math.round(data.currentWeather.main?.temp)}°C</h1>
                    <p className={styles.description}>{data.currentWeather.weather?.[0]?.description}</p>
                    <p>H {Math.round(data.currentWeather.main?.temp_max)}° L {Math.round(data.currentWeather.main?.temp_min)}°</p>
                  </div>
                </div>
              </Col>

              <Col md={7}>
                <Row className={styles.detailsRow}>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Visibility</h6>
                    <p>{(data.currentWeather.visibility / 1000).toFixed(1)} km</p>
                  </Col>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Pressure</h6>
                    <p>{data.currentWeather.main?.pressure} mb</p>
                  </Col>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Humidity</h6>
                    <p>{data.currentWeather.main?.humidity} %</p>
                  </Col>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Wind</h6>
                    <p>{getWindDirection(data.currentWeather.wind?.deg)} {data.currentWeather.wind?.speed} m/s</p>
                  </Col>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Sunrise</h6>
                    <p>{unixToTime(data.currentWeather.sys.sunrise, data.currentWeather.timezone)}</p>
                  </Col>
                  <Col xs={6} md={4} className={styles.detailCard}>
                    <h6>Sunset</h6>
                    <p>{unixToTime(data.currentWeather.sys.sunset, data.currentWeather.timezone)}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          {/* Forecast for Start Date */}
          {data.weather?.list && (
            <Card className={styles.mainWeatherCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Forecast for Start Date ({trip.startDate})</h5>
                {(() => {
                  const forecast = getWeatherForDate(data.weather.list, trip.startDate);
                  if (!forecast) return <p>No forecast data available</p>;
                  return (
                    <Row className="align-items-center">
                      <Col md={5} className={styles.weatherSummary}>
                        <div className={styles.temperature}>
                          <img
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                            alt={forecast.weather[0].description}
                          />
                          <div>
                            <h1>{Math.round(forecast.main.temp)}°C</h1>
                            <p className={styles.description}>{forecast.weather[0].description}</p>
                            <p>H {Math.round(forecast.main.temp_max || forecast.main.temp)}° L {Math.round(forecast.main.temp_min || forecast.main.temp)}°</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={7}>
                        <Row className={styles.detailsRow}>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Feels Like</h6>
                            <p>{Math.round(forecast.main.feels_like)} °C</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Humidity</h6>
                            <p>{forecast.main.humidity} %</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Pressure</h6>
                            <p>{forecast.main.pressure} hPa</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Wind Speed</h6>
                            <p>{forecast.wind.speed} m/s</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })()}
              </Card.Body>
            </Card>
          )}

          {/* Forecast for End Date */}
          {data.weather?.list && (
            <Card className={styles.mainWeatherCard}>
              <Card.Body>
                <h5 className={styles.cardTitle}>Forecast for End Date ({trip.endDate})</h5>
                {(() => {
                  const forecast = getWeatherForDate(data.weather.list, trip.endDate);
                  if (!forecast) return <p>No forecast data available</p>;
                  return (
                    <Row className="align-items-center">
                      <Col md={5} className={styles.weatherSummary}>
                        <div className={styles.temperature}>
                          <img
                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
                            alt={forecast.weather[0].description}
                          />
                          <div>
                            <h1>{Math.round(forecast.main.temp)}°C</h1>
                            <p className={styles.description}>{forecast.weather[0].description}</p>
                            <p>H {Math.round(forecast.main.temp_max || forecast.main.temp)}° L {Math.round(forecast.main.temp_min || forecast.main.temp)}°</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={7}>
                        <Row className={styles.detailsRow}>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Feels Like</h6>
                            <p>{Math.round(forecast.main.feels_like)} °C</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Humidity</h6>
                            <p>{forecast.main.humidity} %</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Pressure</h6>
                            <p>{forecast.main.pressure} hPa</p>
                          </Col>
                          <Col xs={6} md={4} className={styles.detailCard}>
                            <h6>Wind Speed</h6>
                            <p>{forecast.wind.speed} m/s</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })()}
              </Card.Body>
            </Card>
          )}


          {/* Price Summary */}
          <Row className="mb-4">
            <Col md={4}>
              <Card bg="light" className="text-center">
                <Card.Body>
                  <Card.Title>Low Price</Card.Title>
                  <h4>&#8377;{data.price?.low || "N/A"}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card bg="light" className="text-center">
                <Card.Body>
                  <Card.Title>Median Price</Card.Title>
                  <h4>&#8377;{data.price?.median || "N/A"}</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card bg="light" className="text-center">
                <Card.Body>
                  <Card.Title>High Price</Card.Title>
                  <h4>&#8377;{data.price?.high || "N/A"}</h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Popular Locations + Map */}
          {/* Popular Locations + Map */}
          <Row>
            <Col md={6}>
              <h4>Popular Locations</h4>
              {data.pois?.map((p) => (
                <PlaceCard key={p.id} place={p} />
              ))}
            </Col>
            <Col md={6}>
              <h4>Map</h4>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>
                📍 Map center:
                <strong>
                  {data.center.local_name || data.center.display_name || "Selected Location"}
                </strong>
                {data.center.english_name && (
                  <>{" "}(<em>{data.center.english_name}</em>)</>
                )}
                <br />
                ({data.center.lat.toFixed(4)}, {data.center.lon.toFixed(4)})
                <br />
                All famous locations shown are around this center point.
              </p>
              <MapView center={data.center} pois={data.pois} />
            </Col>

          </Row>

        </>
      )}
    </Container>
  );
}
