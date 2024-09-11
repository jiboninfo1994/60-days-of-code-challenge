import { useContext } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentSection from './components/StudentSection';
import { studentCTX } from './contexts/StudentContext';

function App() {
  const { studentStates } = useContext(studentCTX);
  return (
    <div className="App" style={{ marginTop: '40px' }}>
      <StudentForm />
      {studentStates.studentErrMessage && (
        <div className="student-err-message">
          <p>{studentStates.studentErrMessage}</p>
        </div>
      )}
      <StudentSection />
    </div>
  );
}

export default App;
