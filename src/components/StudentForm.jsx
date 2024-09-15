import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createStudent, updateStudent } from '../app/features/Student';

const StudentForm = ({
  studentName,
  setStudentName,
  editMode,
  editableStudent,
  setEditableStudent,
  setEditMode
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentName.trim() === '') {
      return alert('Student field is required!');
    }

    if (editMode) {
      dispatch(updateStudent({ student: editableStudent, studentName }));
      setStudentName('');
      setEditMode(false);
      setEditableStudent(null);
    } else {
      dispatch(createStudent(studentName));
      setStudentName('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Student name..."
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">
        {editMode ? 'Update Student' : 'Add Student'}
      </Button>
    </Form>
  );
};

export default StudentForm;
