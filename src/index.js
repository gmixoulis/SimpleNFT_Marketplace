import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import MyModelViewer from "./components/base/Model";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Explore from "./components/Explore";
import MyProfile from "./components/MyProfile";
import NFTDetail from "./components/NFTDetail";
import MyCourses from "./components/MyCourses";
import CourseView from "./components/Course_View_old1";
import CourseView3 from "./components/CourseView";

import { RingLoader } from "react-spinners";
import NotFound from "./components/404";
import QuizExam from "./components/QuizExam";
import NFTDetailQuiz from "./components/NFTDetailQuiz";
import Terms from "./components/Terms";
import Certificate from "./components/Certificate";

import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

const projectId = process.env.REACT_APP_WALLET_CONNECT;

const conditional_chain =
  process.env.REACT_APP_ENV === "DEV" ? [mainnet, goerli] : [mainnet];

const { chains, publicClient } = configureChains(conditional_chain, [
  w3mProvider({ projectId, stallTimeout: 1_000 }),
  infuraProvider({
    apiKey: "38194ef7ad9f4a149630daf5ab9e7747",
  }),
  alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API }),
  publicProvider(),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={client}>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen containerClip">
                <br></br>
                <RingLoader
                  color={"#d63636"}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/detail" element={<NFTDetail />} />
              <Route path="/detailAssessment" element={<NFTDetailQuiz />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/mycourses" element={<MyCourses />} />
              <Route path="/courseview" element={<CourseView3 />} />
              <Route path="/courseview3" element={<CourseView />} />

              <Route path="/quizExam" element={<QuizExam />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/model" element={<MyModelViewer />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </WagmiConfig>

      <Web3Modal
        themeVariables={{
          "--w3m-font-family": "Helvetica",
          "--w3m-accent-color": "#bb1d2d",
          "--w3m-z-index": "150",
          "--w3m-background-color": "#bb1d2d",
        }}
        termsOfServiceUrl={"https://metau.unic.ac.cy/terms"}
        themeMode={"dark"}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </BrowserRouter>
  </React.StrictMode>
);
