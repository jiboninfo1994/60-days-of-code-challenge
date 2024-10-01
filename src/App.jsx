import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
