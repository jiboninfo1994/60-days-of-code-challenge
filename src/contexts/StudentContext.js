import { createContext, useReducer, useEffect } from 'react';

export const studentCTX = createContext();

const initialState = {
  studentName: '',
  students: [],
  editMode: false,
  editableStudent: null,
  studentErrMessage: ''
};

const reducer = (state, action) => {
  if (action.type === 'CHANGE_STUDENT_NAME') {
    return {
      ...state,
      studentName: action.payload
    };
  } else if (action.type === 'CREATE_STUDENT') {
    const newStudent = {
      id: Date.now() + '',
      title: state.studentName,
      isPresent: undefined
    };
    return {
      ...state,
      students: [...state.students, newStudent],
      studentName: ''
    };
  } else if (action.type === 'EDIT_STUDENT') {
    return {
      ...state,
      editMode: true,
      editableStudent: action.payload,
      studentName: action.payload.title
    };
  } else if (action.type === 'UPDATE_STUDENT') {
    return {
      ...state,
      students: state.students.map((item) => {
        if (item.id === state.editableStudent.id) {
          return {
            ...item,
            title: state.studentName
          };
        }

        return item;
      }),
      editMode: false,
      editableStudent: null,
      studentName: ''
    };
  } else if (action.type === 'DELETE_STUDENT') {
    console.log(action.payload.id);

    return {
      ...state,
      students: state.students.filter((item) => item.id !== action.payload.id)
    };
  } else if (action.type === 'STUDENT_STATUS') {
    if (
      action.payload.data.isPresent !== undefined &&
      action.payload.status !== 'toggle'
    ) {
      const errMessage = action.payload.data.isPresent
        ? 'This student alreay in the Present list'
        : 'This student alreay in the Absent list';
      return {
        ...state,
        studentErrMessage: errMessage
      };
    }

    return {
      ...state,
      students: state.students.map((item) => {
        if (item.id === action.payload.data.id) {
          if (action.payload.status === 'present') {
            console.log('I am inner');

            return { ...item, isPresent: true };
          } else if (action.payload.status === 'absent') {
            return { ...item, isPresent: false };
          } else if (action.payload.status === 'toggle') {
            return { ...item, isPresent: !item.isPresent };
          }
        }

        return item;
      })
    };
  } else if (action.type === 'CLEAR_ERROR') {
    return {
      ...state,
      studentErrMessage: ''
    };
  }
};

const StudentContext = ({ children }) => {
  const [studentStates, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (studentStates.studentErrMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [studentStates.studentErrMessage]);

  // Handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentStates.studentName.trim() === '') {
      return alert('Student name is required!');
    }

    studentStates.editMode
      ? dispatch({ type: 'UPDATE_STUDENT' })
      : dispatch({ type: 'CREATE_STUDENT' });
  };

  // Derived state
  const presentStudent = studentStates.students?.filter(
    (item) => item.isPresent === true
  );
  const absentStudent = studentStates.students?.filter(
    (item) => item.isPresent === false
  );

  const contextValue = {
    handleSubmit,
    presentStudent,
    absentStudent,
    studentStates,
    dispatch
  };

  return (
    <studentCTX.Provider value={contextValue}>{children}</studentCTX.Provider>
  );
};

export default StudentContext;
