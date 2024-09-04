import { bioData } from './data';
import './App.css';
import BioData from './components/BioData';

function App() {
  console.log(bioData);

  return (
    <div className="App">
      {bioData &&
        bioData.length > 0 &&
        bioData?.map((item) => <BioData key={item.id} {...item} />)}
    </div>
  );
}

export default App;
