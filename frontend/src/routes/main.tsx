import React, {FC, useState} from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { rankingContract } from "../web3Config";

interface MainProps {
    account: string;
}


const Main: FC<MainProps> = ({ account }) => {
    const [newRankingCard, setNewRankingCard] = useState<string>();

    const onClickMint = async () => {
        try{
            if (!account) return;

            const response = await rankingContract.methods.solvedProblem('name').send({ from: account });

            console.log(response);
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <Flex w="full" h="100vh" justify="center" alignItems="center" direction="column">
            <Box>
                {newRankingCard ? (
                    <div>AnimalCard</div> 
                ) : (
                    <Text>Let's solve the problem!!!</Text> 
                )}
            </Box>
            <Button mt={4} size="sm" colorScheme="blue" onClick={onClickMint}>
                Mint
            </Button>
        </Flex>
    );
};

export default Main;
