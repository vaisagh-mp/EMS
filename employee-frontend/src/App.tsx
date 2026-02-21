import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/FormBuilder";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form-builder" element={<FormBuilder />} />
      <Route path="/form-builder/:formId" element={<FormBuilder />} />
      <Route path="/create-employee/:formId" element={<CreateEmployee />} />
      <Route path="/employees" element={<EmployeeList />} />
    </Routes>
  );
}

export default App;