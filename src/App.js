import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import StudentForm from './components/StudentForm';
import AllStudent from './components/AllStudent';
import { useEffect, useState } from 'react';
import StudentStatusList from './components/StudentStatusList';
import { useDispatch, useSelector } from 'react-redux';
import { studentStatusHandle } from './app/features/Student';

function App() {
  const [editMode, setEditMode] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [editableStudent, setEditableStudent] = useState(null);
  const [presentStudentList, setPresentStudentList] = useState([]);
  const [absentStudentList, setAbsentStudentList] = useState([]);

  const { students, prosentStudentList } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(prosentStudentList);
  }, [prosentStudentList]);

  //   console.log(presentStudentList);
  useEffect(() => {
    setPresentStudentList(students.filter((item) => item.isPresent === true));
    setAbsentStudentList(students.filter((item) => item.isPresent === false));
  }, [students]);

  const removeStudentHandler = (student) => {
    if (student.isPresent) {
      setPresentStudentList(
        presentStudentList?.filter((item) => item.id !== student.id)
      );
    } else {
      setAbsentStudentList(
        absentStudentList?.filter((item) => item.id !== student.id)
      );
    }

    dispatch(studentStatusHandle({ student, status: 'remove' }));
  };

  return (
    <div className="App pt-5">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <StudentForm
              editMode={editMode}
              studentName={studentName}
              setStudentName={setStudentName}
              editableStudent={editableStudent}
              setEditableStudent={setEditableStudent}
              setEditMode={setEditMode}
            />
          </Col>
          <Row className="pt-5">
            <Col lg="4">
              <AllStudent
                setEditableStudent={setEditableStudent}
                setEditMode={setEditMode}
                setStudentName={setStudentName}
              />
            </Col>
            <Col lg="4">
              <StudentStatusList
                heading="Present List"
                statusList={presentStudentList}
                removeStudentHandler={removeStudentHandler}
              />
            </Col>
            <Col lg="4">
              <StudentStatusList
                heading="Absent List"
                statusList={absentStudentList}
                removeStudentHandler={removeStudentHandler}
              />
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default App;
