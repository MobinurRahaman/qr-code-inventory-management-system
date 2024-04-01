import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ScanQRCode from "./pages/ScanQRCode/ScanQRCode";
import GenerateQRCode from "./pages/GenerateQRCode/GenerateQRCode";
import AuthProvider from "./context/AuthContext";
import Edit from "./pages/Edit/Edit";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="generateqrcode" element={<GenerateQRCode />} />
          <Route path="scanqrcode" element={<ScanQRCode />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
