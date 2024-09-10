import React, { useContext } from 'react';
import AllStudentList from './AllStudentList';
import StudentStatusList from './StudentStatusList';
import { studentCTX } from '../contexts/StudentContext';

const StudentSection = () => {
  const { presentStudent, absentStudent } = useContext(studentCTX);
  return (
    <div className="student-section">
      <AllStudentList />
      <StudentStatusList
        heading="Present Student List"
        statusStudentList={presentStudent}
      />

      <StudentStatusList
        heading="Absent Student List"
        statusStudentList={absentStudent}
      />
    </div>
  );
};

export default StudentSection;
