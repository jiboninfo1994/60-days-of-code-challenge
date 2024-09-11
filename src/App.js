import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import UserForm from './components/UserForm';
import AllUserTable from './components/AllUserTable';
import UserStatusTabele from './components/UserStatusTabele';

function App() {
  return (
    <div className="App pt-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="5">
            <UserForm />
          </Col>
        </Row>
        <div className="student-table-wrap pt-4">
          <Row>
            <Col xs lg="7">
              <AllUserTable />
            </Col>
            <Col xs lg="5">
              <UserStatusTabele />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default App;
