import React from 'react';
import AllStudentList from './AllStudentList';
import PresentList from './PresentList';
import AbsentList from './AbsentList';

const StudentSection = (props) => {
  return (
    <div className="student-section">
      <AllStudentList
        editHandler={props.editHandler}
        deleteHandler={props.deleteHandler}
        studentStatusHandler={props.studentStatusHandler}
        students={props.students}
      />
      <PresentList
        students={props.students}
        presentStudent={props.presentStudent}
        studentStatusHandler={props.studentStatusHandler}
      />
      <AbsentList
        students={props.students}
        absentStudent={props.absentStudent}
        studentStatusHandler={props.studentStatusHandler}
      />
    </div>
  );
};

export default StudentSection;
