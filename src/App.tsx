import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationsProvider } from "./context/simulation_context";
import Home from "./pages/home";
import NovaSimulacao from "./pages/simulation";
import Historico from "./pages/history";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SimulationsProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={3}
            theme="colored"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-simulacao" element={<NovaSimulacao />} />
            <Route path="/historico" element={<Historico />} />
            <Route
              path="/simulacao/:simulationId"
              element={<NovaSimulacao />}
            />
          </Routes>
        </SimulationsProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
