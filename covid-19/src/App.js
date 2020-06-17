import React, {useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Moment from 'react-moment';
import Form from 'react-bootstrap/Form';
import Columns from 'react-columns';

import './App.css';

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

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

  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  })

  

  const countries = filterCountries.map((data, i) => {
    return (
      <Card key={i}
            bg="light"
            text="dark"
            className="text-center"
            style={{margin:"10px"}}
      >
        <Card.Img  variant="top" src={data.countryInfo.flag} />
                            <Card.Body>
                              <Card.Title>{data.country}</Card.Title>
                              <Card.Text>Nombre de cas {data.cases}</Card.Text>
                              <Card.Text>Nombre de décès {data.deaths}</Card.Text>
                              <Card.Text>Nombre de guéris {data.recovered}</Card.Text>
                              <Card.Text>{data.todayDeaths} personnes décédés aujourd'hui</Card.Text>
                              <Card.Text>{data.todayRecovered} personnes guéris aujourd'hui</Card.Text>
                              <Card.Text>{data.continent}</Card.Text>
                              <Card.Text>{data.countryInfo.iso2}</Card.Text>
                            </Card.Body>        
      </Card>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (<div>
    <CardDeck>
  <Card bg="secondary" 
        text="white" 
        className="text-center"
        style={{margin:"10px"}}
  >
    <Card.Body>
      <Card.Text>Personnes Infectés</Card.Text>
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
      <Card.Text>Personnes Décedés</Card.Text>
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
      <Card.Text>Personnes Guéries </Card.Text>
      <Card.Text>
       {latest.recovered} Personnes guéries après avoir contracté la Covid-19
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <Moment locale="fr">{lastUpdated}</Moment>
    </Card.Footer>
  </Card>
</CardDeck> 

<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Label>Recherche</Form.Label>
    <Form.Control 
    type="text" 
    placeholder="Recherche un Pays"
    onChange={e => setSearchCountries(e.target.value)} 
  />
  </Form.Group>
</Form>

<Columns queries={queries}>{countries}</Columns>
      
  </div>
  );
}

export default App;
