import { createContext, useRef, useState } from 'react';

export const studentCTX = createContext();

const StudentContext = ({ children }) => {
  // All state
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);
  const [studentErrMessage, setStudentErrMessage] = useState('');

  // Student error message cleaTimeoutId
  const cleaTimeoutId = useRef(null);

  // Handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentName.trim() === '') {
      return alert('Student name is required!');
    }

    editMode ? updateHandler() : createHandler();
  };

  // Edit handler
  const editHandler = (student) => {
    setEditMode(true);
    setStudentName(student.title);
    setEditableStudent(student);
  };

  // Create handler
  const createHandler = () => {
    const newStudent = {
      id: Date.now() + '',
      title: studentName,
      isPresent: undefined
    };

    setStudents([newStudent, ...students]);
    setStudentName('');
  };

  // Update handler
  const updateHandler = () => {
    setStudents(
      students?.map((item) => {
        if (item.id === editableStudent.id) {
          return { ...item, title: studentName };
        }

        return item;
      })
    );

    setStudentName('');
    setEditMode(false);
    setEditableStudent(null);
  };

  // Delete handler
  const deleteHandler = (id) => {
    setStudents(students?.filter((item) => item.id !== id));
  };

  // Student status handler
  const studentStatusHandler = (student, action) => {
    if (student.isPresent !== undefined && action !== 'toggle') {
      studentError(student.isPresent);
      return;
    }

    setStudents(
      students?.map((item) => {
        if (item.id === student.id) {
          if (action === 'present') {
            return { ...item, isPresent: true };
          } else if (action === 'absent') {
            return { ...item, isPresent: false };
          } else if (action === 'toggle') {
            return { ...item, isPresent: !item.isPresent };
          }
        }

        return item;
      })
    );
  };

  // Derived state
  const presentStudent = students?.filter((item) => item.isPresent === true);
  const absentStudent = students?.filter((item) => item.isPresent === false);

  // Student Error

  const studentError = (status) => {
    if (cleaTimeoutId.current) {
      clearTimeout(cleaTimeoutId.current);
    }
    if (status) {
      setStudentErrMessage('This student is already in the Present List');
    } else {
      setStudentErrMessage('This student is already in the Absent List');
    }

    // Student error will be hide after 3000 ms
    cleaTimeoutId.current = setTimeout(() => {
      setStudentErrMessage('');
    }, 3000);
  };

  const contextValue = {
    studentName,
    setStudentName,
    students,
    setStudents,
    editMode,
    setEditMode,
    editableStudent,
    setEditableStudent,
    studentErrMessage,
    setStudentErrMessage,
    handleSubmit,
    editHandler,
    updateHandler,
    deleteHandler,
    studentStatusHandler,
    presentStudent,
    absentStudent
  };

  return (
    <studentCTX.Provider value={contextValue}>{children}</studentCTX.Provider>
  );
};

export default StudentContext;
