import Login from "./pages/Login ";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./style.scss";
import "./App.css";
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

export const UserContext = React.createContext();
export const SetUserContext = React.createContext();

function App() {
    const [authUser, setAuthUser] = useState(null);

    const ProtectedRoute = ({ children }) => {
        if (!authUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <Router>
            <UserContext.Provider value={authUser}>
                <SetUserContext.Provider value={setAuthUser}>
                    <Routes>
                        <Route path="/">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="login"
                                element={<Login setAuthUser={setAuthUser} />}
                            />
                            <Route path="register" element={<Register />} />
                        </Route>
                    </Routes>
                </SetUserContext.Provider>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
