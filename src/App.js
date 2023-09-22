import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Counter from "./features/Counter";
import "./app.css";

export const AppContext = createContext();

function App() {
    const [admin, setAdmin] = useState(false);

    // Using a query hook automatically fetches data and returns query values
    // const { data, error, isLoading, isSuccess, isFetching } = useGetUsersQuery();
    // Individual hooks are also accessible under the generated endpoints:
    // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

    return (
        <div className="App">
            <AppContext.Provider
                value={{
                    admin,
                    setAdmin,
                }}
            >
                <div className="container">
                    <Navbar />
                    <div className="routes-container">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Counter />} />
                        </Routes>
                    </div>

                    <Footer />
                </div>
            </AppContext.Provider>
        </div>
    );
}

export default App;
