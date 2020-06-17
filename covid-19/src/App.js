import React, {useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Moment from 'react-moment';

import './App.css';

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")

      ])
    
      .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
      })
      .catch(err => {
      console.log(err);
      });
      }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  Moment.globalLocale = 'fr';

  const countries = results.map(data => {
    return (
      <Card bg="light"
            text="dark"
            className="text-center"
            style={{margin:"10px"}}
      >
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Nombre de cas {data.cases}</Card.Text>
          <Card.Title>Nombre de décès {data.deaths}</Card.Title>
          <Card.Text>Nombre de guéris {data.recovered}</Card.Text>
          <Card.Title>{data.todayDeaths} personnes décédés aujourd'hui</Card.Title>
          <Card.Text>{data.todayRecovered} personnes guéris aujourd'hui</Card.Text>
          <Card.Title>{data.continent}</Card.Title>
          <Card.Text>{data.countryInfo.iso2}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (<div>
    <CardDeck>
  <Card bg="secondary" 
        text="white" 
        className="text-center"
        style={{margin:"10px"}}
  >
    <Card.Body>
      <Card.Title>Personnes Infectés</Card.Title>
      <Card.Text>{latest.cases}</Card.Text>
    </Card.Body>
    <Card.Footer>
    <Moment locale="fr">{latest.updated}</Moment>
    </Card.Footer>
  </Card>
  <Card bg="danger"  
        text="white" 
        className="text-center"
        style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Personnes Décedés</Card.Title>
      <Card.Text>
        {latest.deaths} Décés du au Coronavirus
      </Card.Text>
    </Card.Body>
    <Card.Footer>    
    <Moment>{latest.updated}</Moment>
    </Card.Footer>
  </Card>
  <Card bg="success"  
        text="white" 
        className="text-center"
        style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Personnes Guéries </Card.Title>
      <Card.Text>
       {latest.recovered} Personnes guéries après avoir contracté la Covid-19
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Moment locale="fr">{lastUpdated}</Moment>
    </Card.Footer>
  </Card>
</CardDeck> 
{countries} 
      
  </div>
  );
}

export default App;
