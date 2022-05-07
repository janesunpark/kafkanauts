import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Port, Nickname, Time } from '../../types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Button, Container, InputGroup } from '@themesberg/react-bootstrap';

//defines the types of values in state, with the types imported from types file 
interface HomeState {
  port: Port,
  nickname: Nickname,
  time: Time,
  portError: boolean
}

//a variable called Home is defined as a TypeScript React functional component that accepts anonymous arg
const Home: React.FC = () => {
  //uses TypeScript generics to set the interface HomeState as the prop so that whatever the state is, it follows the types defined in HomeState
  const [ input, setInput ] = useState<HomeState>({

    //sets the values of state accordingly 
    port: '',
    nickname: '',
    time: null,
    portError: false,
  })
  
  //useNavigate is called to be used for navigating to different pages
  const navigate = useNavigate();

  //function handleOnChange uses the HTML input value associated with the event as an arg
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //updates the state with the input value 
    setInput({ ...input, [e.currentTarget.name]: e.currentTarget.value, portError: false});
  };

  //defines submit function that gets triggered with an event 
  const handleSubmit = (e) => {
    e.preventDefault();
    //creates an axios request that sends the obj to the prom-port api back end 
    axios
      .post('http://localhost:8080/api/prom-port', {
        port: input.port,
        nickname: input.nickname,
        time: new Date().toISOString(),
      })
      //reroutes the login page to dashboard
      .then((res) => { navigate('/dashboard/overview') })
      .catch((err) => {
        setInput({
          ...input,
          portError: true
        })
        console.error(err);
      });
  };

  //renders the home/login page 
  return (
    <div className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5" >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Kafkanauts</h3>
                <h5>Your Metrics in a Nutshell</h5>
              </div>
              <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group id="port-name" className="mb-4">
                  <Form.Label>Enter Prometheus Port</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faFileExport} />
                    </InputGroup.Text>
                    <Form.Control autoFocus required type="text" name="port" title="port-field" placeholder="9090" isInvalid={input.port.match(/^\d*$/) === null || input.portError} onChange={handleOnChange}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid Prometheus port.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Group id="nickname" className="mb-4">
                    <Form.Label>Cluster Nickname</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUserAstronaut} />
                      </InputGroup.Text>
                      <Form.Control type="text" name="nickname" placeholder="Kafkanauts" title={'nickname-field'} onChange={handleOnChange}/>
                    </InputGroup>
                  </Form.Group>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-2" title={'submit-button'} disabled={input.port === ''}>Submit</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
