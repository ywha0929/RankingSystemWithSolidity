import React, {FC, useState, Component} from 'react';
import {Box, Text, Flex, Button} from '@chakra-ui/react';
import {rankingContract} from '../contracts';
import Web3 from 'web3';
import Ranking from "../components/Ranking";
//FC for functional component


class Main extends React.Component{

    constructor(props : any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }
    state={Name : ''};
    onSubmit = async () => {
        try{
            const returnVal = await rankingContract.methods.solvedProblem(this.state.Name).send({from: "0xC30dd9DfaB1fb35197A67611f8b3186f6934dE31"});
            console.log(returnVal);
        }
        catch(error) {
            console.error(error);
        }
    }
    handleChange = (event: any) => {
        this.setState({Name: event.target.value});
    }

    render () {
        return <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
        
            <label>
                Name:
                <input type="text" value={this.state.Name} onChange={this.handleChange} />
            </label>
           
            <Button mt={4} size="sm" colorScheme="blue" onClick={this.onSubmit}>
                Submit
            </Button>
            <Ranking/>
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

export default Main