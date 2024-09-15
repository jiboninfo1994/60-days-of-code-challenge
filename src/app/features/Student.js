import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: []
};
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    createStudent: (state, action) => {
      console.log(action.payload);

      const newStudent = {
        id: Date.now() + '',
        name: action.payload,
        isPresent: undefined
      };

      return {
        ...state,
        students: [...state.students, newStudent]
      };
    },
    deleteStudent: (state, action) => {
      return {
        ...state,
        students: state.students?.filter((item) => item.id !== action.payload)
      };
    },
    updateStudent: (state, action) => {
      return {
        ...state,
        students: state.students?.map((item) => {
          if (item.id === action.payload.student.id) {
            return { ...item, name: action.payload.studentName };
          }
          return item;
        })
      };
    },
    studentStatusHandle: (state, action) => {
      const { student, status } = action.payload;
      if (
        student.isPresent !== undefined &&
        status !== 'toggle' &&
        status !== 'remove'
      ) {
        return alert(
          `This student is already in ${
            student.isPresent ? 'Present List' : 'Absent List'
          }`
        );
      }

      return {
        ...state,
        students: state.students?.map((item) => {
          if (item.id === student.id) {
            switch (status) {
              case 'present': {
                return { ...item, isPresent: true };
              }
              case 'absent': {
                return { ...item, isPresent: false };
              }
              case 'toggle': {
                return { ...item, isPresent: !item.isPresent };
              }
              case 'remove': {
                return { ...item, isPresent: undefined };
              }

              default:
                return item;
            }
          }

          return item;
        }),
        presentStudentList: [...state.students]
      };
    }
  }
});

export const {
  createStudent,
  deleteStudent,
  updateStudent,
  studentStatusHandle,
  removeStudent
} = studentSlice.actions;

export default studentSlice.reducer;
