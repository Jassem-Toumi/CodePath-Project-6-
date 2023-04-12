import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DetailedView from "./pages/detailedView"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import  Layout  from "./layout";
import DataViz from "./pages/dataViz";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index={true} element={<App />} />
        <Route path="/detailedView/:id" element={<DetailedView />}/>
        <Route path="/dataviz" element={<DataViz />}/>
        </Route>
      </Routes>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
