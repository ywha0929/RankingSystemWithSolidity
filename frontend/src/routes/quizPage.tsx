import React, {FC, useState, Component} from 'react';
import {Box, Text, Flex, Button, Input, propNames} from '@chakra-ui/react';
import {rankingContract} from '../contracts';
import Web3 from 'web3';
import Ranking from "../components/Ranking";
import {Socket,io} from 'socket.io-client';
import {Buffer} from 'buffer';
import { mainModule } from 'process';
import { Link, Navigate, useNavigate,  } from 'react-router-dom';


type Props = {
    _changeShowQuizState : Function
    onSubmit : Function
}
var quizNum : number;
class QuizPage extends React.Component<Props>{

    state={
        UserAnswer : '',
        Quiz : ["What is 127 * 15 ?", "What is the fastest animal in the world?", "What is the best smartphone company?", "What is the average IQ of human being?", "What is the biggest species of dogs?"],
        Answer : ["1905", "cheetah", "Samsung","100" , "bulldog"],
        showAnswerStatus : false,
        AnswerStatus : '',
    }
    constructor(props : any) {
        super(props);
        let quizNumber = this._generateRandomNumber();
        console.log(quizNumber);
        quizNum=quizNumber;
        console.log(this.state.Quiz[quizNum]);
    }
    _generateRandomNumber = () => {
        return Math.floor(Math.random()*(4-0 + 1));
    }
    onClickSubmit = () => {
        this.setState({
            showAnswerStatus : true,
        })
        if(this.state.UserAnswer == this.state.Answer[quizNum])
        {
            console.log("answer");
            this.setState({
                AnswerStatus : 'You are Correct!'
            })
        }
        else
        {
            console.log("wrong");
            this.setState({
                AnswerStatus : 'Try again Later!'
            })
        }
    }
    onClickReturn = () => {
        if(this.state.AnswerStatus == "You are Correct!")
        {
            this.props.onSubmit();
        }
        this.props._changeShowQuizState(false);
        

    }

    handleChange = (event: any) => {
        this.setState({UserAnswer: event.target.value});
    }

    render () {
        if(this.state.showAnswerStatus)
        {
            return <Flex w="full" h="10vh" justifyContent="flex-start" alignItems="center" direction="column">
                
                    <Box >
                        <Text fontSize="5vh"> {this.state.AnswerStatus} </Text>
                    </Box>
                    <Button size="sm" colorScheme="blue" onClick={this.onClickReturn}>
                        <Text fontSize="2vh"> return to main page </Text>
                    </Button>
                <Link to="/rankingPage">LeaderBoard</Link>
            </Flex>;
        }
        else
        {
            return <Flex w="full" h="10vh" justifyContent="flex-start" alignItems="center" direction="column">
                <Box >
                    <Text fontSize="5vh"> {this.state.Quiz[quizNum]} </Text>
                </Box>
                
                <Flex w="full" h="10vh" justifyContent="center" alignItems="center" direction="row">
                    <Text fontSize="3vh"> Answer </Text>
                    <Box >
                        <Input textAlign={'center'} type="text" value={this.state.UserAnswer} onChange={this.handleChange}/>
                    </Box>
                    <Button size="sm" colorScheme="blue" onClick={this.onClickSubmit}>
                        <Text fontSize="2vh"> Submit </Text>
                    </Button>
                </Flex>
                <Link to="/rankingPage">LeaderBoard</Link>
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

export default QuizPage