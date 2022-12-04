import React, { FC, useEffect , useState} from "react";
import {Button} from "@chakra-ui/react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./routes/main";
import QuizPage from "./routes/quizPage";
import RankingPage from "./routes/rankingPage";

const App: FC = () => { 
  const [account, setAccount] = useState<string>("");
  
  
  const getAccount = async () => {
    try {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount("0xC30dd9DfaB1fb35197A67611f8b3186f6934dE31");
      }
      else{
        alert("Install Metamask!");
      }
    } catch( error ) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getAccount();
  },[account]);

  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/rankingPage" element={<RankingPage/>}/>
      </Routes>
    </BrowserRouter>
  )
  //<Button colorScheme="blue"> web3-boilerplate </Button>;
};

export default App;
