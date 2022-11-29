import React, {FC, useState, Component} from 'react';
import {Box, Text, Flex, Button} from '@chakra-ui/react';
// import { mintAnimalTokenContract } from '../contracts';
import {rankingContract} from '../contracts';
import Web3 from "../../node_modules/web3";
//FC for functional component
interface MainProps {
    account: string;
}

class Ranking extends Component{
    state = {
        Rankings : new Array(),
    }

    onClickRefresh = async () => {
        console.log("onClickRefresh invoked");
        const numPlayers = await rankingContract.methods.getNumberOfPlayers().call();

        console.log("Number of Players ",numPlayers);
        // const numRank0 = await rankingContract.methods.getRankerName(0,1).call();
        // console.log("Number of Players ",numRank0);
        var newArr = new Array();
        await rankingContract.methods._sortByScore().send({from: "0xC30dd9DfaB1fb35197A67611f8b3186f6934dE31"});
        for(var i = 0; i< numPlayers && i< 3 ; i++)
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

    render () {
        let Ranks = this.state.Rankings.map((item,index) => {
            console.log(item);
            <Text> {item}</Text>
        })
        return <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">

                 <Button mt={4} size="sm" colorScheme="blue" onClick={this.onClickRefresh}>
                   Refresh
                </Button>

                {this.state.Rankings.map(item =>(
                    <Text key={item}> {item.Name}    {item.numSolved}</Text>
                ))}

             </Flex>;
    }
}
export default Ranking



// const Ranking: FC<MainProps> = ({account}) => {
//     const [newAnimalType,setNewAnimalType]=useState<string>();

//     const onClickRefresh = async () => {
//         try{
//             if(!account) return;

            
//             // if(response.status) {
//         const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();


//         const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength.length, 10) -1).call();

//         const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

//         setNewAnimalType(animalType);
//             // }

            
//         } catch(error) {
//             console.error(error);
//         }
//     };

//     return <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">

//         <Button mt={4} size="sm" colorScheme="blue" onClick={onClickRefresh}>
//             Refresh
//         </Button>
//         <Box>
            
//         </Box>
//     </Flex>;
// }

