import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import IndexPage from "./Pages/IndexPage";
import RegistrationPage from "./Pages/RegistrationPage";
import { UserContextProvider } from "./UserContext";
import Header from "./Header";
import ProfilePage from "./Pages/ProfilePage";
import CreatePost from "./Pages/createpost";
import MyBlog from "./Pages/MyBlog";


const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Routes>
            <Route index element={<IndexPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/header" element={<Header />} />
            <Route path="/home" element={<Header />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/createpost" element={<CreatePost />}></Route>
            <Route path="/posts" element={<MyBlog />} />

          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
};

export default App;
