import { Route, Routes } from 'react-router-dom';
import Form from './modules/Form';
import Main from './modules/Main';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}/>
      <Route path='/login' element={<Form isSignIn={true} />}/>
      <Route path='/register' element={<Form isSignIn={false} />}/>
    </Routes>
  );
}

export default App;
