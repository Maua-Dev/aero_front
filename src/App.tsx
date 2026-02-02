import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationsProvider } from "./context/simulation_context";
import Home from "./pages/home";
import NovaSimulacao from "./pages/simulation";
import Historico from "./pages/history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SimulationsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-simulacao" element={<NovaSimulacao />} />
            <Route path="/historico" element={<Historico />} />
          </Routes>
        </SimulationsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
