
import './App.css';
import Form from "./components/CreateTask/CreateTask.jsx"
import List from "./components/CreateTaskList/CreateTaskList.jsx"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/List' element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;