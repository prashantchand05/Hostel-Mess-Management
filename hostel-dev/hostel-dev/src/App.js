import logo from "./logo.svg";
import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Comp/NavBar";
import Home from "./Screens/Home/Home";
import ProtectedRoute from "./Comp/ProtectedRoute/ProtectedRoute";
import Display from "./Screens/Display/Display";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={ <ProtectedRoute><Display /></ProtectedRoute>} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
