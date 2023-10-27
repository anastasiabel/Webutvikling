import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPageHeader from './components/shared/MainPageHeader';
import { HomePage, GamePage } from './pages';
import CreateGamePage from './pages/CreateGamePage';

function App() {
  return (
    <BrowserRouter>
      <MainPageHeader/>
      <main className='container'>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path="/game/new" element={<CreateGamePage/>}></Route>
          <Route path="/game/:id" element={<GamePage/>}></Route>

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
