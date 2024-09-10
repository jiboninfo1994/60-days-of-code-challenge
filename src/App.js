import { useContext } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentSection from './components/StudentSection';
import { studentCTX } from './contexts/StudentContext';

function App() {
  const { studentErrMessage } = useContext(studentCTX);
  return (
    <div className="App" style={{ marginTop: '40px' }}>
      <StudentForm />
      {studentErrMessage && (
        <div className="student-err-message">
          <p>{studentErrMessage}</p>
        </div>
      )}
      <StudentSection />
    </div>
  );
}

export default App;
