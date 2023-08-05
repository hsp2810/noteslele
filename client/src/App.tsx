import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to={"/all"} />}></Route>
        <Route path='/all' element={<Notes />}></Route>
        <Route path='/create' element={<CreateNote />}></Route>
      </Routes>
    </>
  );
}

export default App;
