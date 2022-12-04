import React, {FC, useState, Component} from 'react';
import {Box, Text, Flex, Button, LinkBox, } from '@chakra-ui/react';
import {rankingContract} from '../contracts';
import Web3 from 'web3';
import Ranking from "../components/Ranking";
import {Socket,io} from 'socket.io-client';
import { Link, Navigate, useNavigate,  } from 'react-router-dom';
import {Buffer} from 'buffer';

import QuizPage from "./quizPage";
//FC for functional component

var client: any;
class Main extends React.Component{

    constructor(props : any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    state={
        Name : '',
        showQuiz : false,
        numQuiz : 0,
    };
    
    onSubmit = async () => {
        try{
            const returnVal = await rankingContract.methods.solvedProblem(this.state.Name).send({from: "0xC30dd9DfaB1fb35197A67611f8b3186f6934dE31"});
            console.log(returnVal);
        }
        catch(error) {
            console.error(error);
        }
    }
    onGetQuizClicked = () => {
        this.setState({
            showQuiz : true
        })
    }

    _changeShowQuizState = (state : boolean) => {
        console.log("_changeShowQuizState invoked");
        this.setState({
            showQuiz : state
        })
    }

    handleChange = (event: any) => {
        this.setState({Name: event.target.value});
    }

    render () {
        if(!this.state.showQuiz)
        {
            return <Flex w="full" h="10vh" justifyContent="flex-start" alignItems="center" direction="column">
                <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="row">
                    <Box >
                        Name:
                        <input type="text" value={this.state.Name} onChange={this.handleChange} />
                    </Box>
                    <Button size="sm" colorScheme="blue" onClick={this.onGetQuizClicked}>
                        getQuiz
                    </Button>
                </Flex>
                
                <Link to="/rankingPage">LeaderBoard</Link>
            
            </Flex>;
        }
        else
        {
            return <Flex w="full" h="50vh" justifyContent="flex-start" alignItems="center" direction="column">
                
                <QuizPage _changeShowQuizState={this._changeShowQuizState} onSubmit={this.onSubmit}/>
                
            
            </Flex>;
        }
        
    }
}






// interface MainProps {
//     account: string;
// }
// const Main: FC<MainProps> = ({account}) => {
//     const [newAnimalType,setNewAnimalType]=useState<string>();


//     return <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
//         <form onSubmit={this.handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" value={this.state.value} onChange={this.handleChange} />
//             </label>

//         </form>
//         <Button mt={4} size="sm" colorScheme="blue" onClick={onSumbit}>
//             Mint
//         </Button>
//     </Flex>;
// }

export default Main