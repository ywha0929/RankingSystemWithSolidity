import React, {FC, useState, Component} from 'react';
import {Box, Text, Flex, Button, Input} from '@chakra-ui/react';
import {rankingContract} from '../contracts';
import Web3 from 'web3';
import Ranking from "../components/Ranking";
import {Socket,io} from 'socket.io-client';
import {Buffer} from 'buffer';
//FC for functional component

class RankingPage extends React.Component{

    constructor(props : any) {
        super(props);
        
    }
    state = {
        Rankings : new Array(),
        Name:'',
        numContents: 3,
    }
    // state={Name : ''};
    
    onClickRefresh = async () => {
        console.log("onClickRefresh invoked");
        const numPlayers = await rankingContract.methods.getNumberOfPlayers().call();

        console.log("Number of Players ",numPlayers);
        // const numRank0 = await rankingContract.methods.getRankerName(0,1).call();
        // console.log("Number of Players ",numRank0);
        var newArr = new Array();
        await rankingContract.methods._sortByScore().send({from: "0xC30dd9DfaB1fb35197A67611f8b3186f6934dE31"});
        for(var i = 0; i< numPlayers && i< this.state.numContents ; i++)
        {
            var Ranker = await rankingContract.methods.getRankerName(i, 1).call();
            
            //newArr.push( Web3.utils.hexToString( Ranker ));
            //console.log(Ranker);
            var numSolved = await rankingContract.methods.getNumSolved(Ranker).call();
            var newRankerInfo = {
                "Name": Web3.utils.hexToString(Ranker),
                "numSolved": numSolved,
            }
            newArr.push(newRankerInfo);
        }

        this.setState({
            Rankings : newArr
        });
        this.forceUpdate();
    }

    handleChange = (event: any) => {
        this.setState({numContents: event.target.value});
    }

    render () {
        return <Flex w="full" h="20vh" justifyContent="flex-start" alignItems="center" direction="column">
            
            <Text fontSize="10vh"> LeaderBoard</Text>
            <Button size="lg" colorScheme="blue" onClick={this.onClickRefresh}>
                <Text fontSize="5vh"> Refresh </Text>
            </Button>
            <Flex w="full" h="5vh" justifyContent="center" alignItems="center" direction="row">
                <Text fontSize="3vh"> number of contents : </Text>
                <Input w="10vh" fontSize="3vh" textAlign={'center'} type="text" value={this.state.numContents} onChange={this.handleChange}/>

            </Flex>
            {this.state.Rankings.map((item,index) =>(
                <Flex w="full" h="20vh" justifyContent="center" alignItems="center" direction="row">
                    <Text key={index} fontSize="5vh"> {item.Name}    {item.numSolved}</Text>
                </Flex>
                
            ))}
        </Flex>;
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

export default RankingPage