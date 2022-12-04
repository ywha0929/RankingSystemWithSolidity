import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Main from "./routes/main";
import QuizPage from "./routes/quizPage";
import RankingPage from "./routes/rankingPage";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rankingPage" element={<RankingPage/>}/>
      </Routes>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
