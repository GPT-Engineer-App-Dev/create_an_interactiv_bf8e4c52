import React, { useState } from "react";
import { Box, Grid, Button, Text, useToast, VStack } from "@chakra-ui/react";
import { FaTimes, FaCircle } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    const winner = checkWinner(newBoard);

    if (winner) {
      toast({
        title: `Player ${winner} won!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setGameOver(true);
    } else if (!newBoard.includes(null)) {
      toast({
        title: "Draw!",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      setGameOver(true);
    } else {
      setIsXNext(!isXNext);
    }

    setBoard(newBoard);
    if (!isXNext) {
      playAI(newBoard);
    }
  };

  const playAI = (newBoard) => {
    let availableSpots = newBoard.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
    if (availableSpots.length === 0) return;

    let randomIndex = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    setTimeout(() => handleClick(randomIndex), 500); // Simulate AI thinking time
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setGameOver(false);
  };

  return (
    <VStack spacing={8} p={5}>
      <Text fontSize="xl">Tic Tac Toe Game</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {board.map((value, index) => (
          <Box key={index} w="40" h="40" borderWidth="1px" display="flex" alignItems="center" justifyContent="center" fontSize="3xl" cursor="pointer" onClick={() => handleClick(index)}>
            {value === "X" && <FaTimes />}
            {value === "O" && <FaCircle />}
          </Box>
        ))}
      </Grid>
      <Button colorScheme="teal" onClick={resetGame}>
        New Game
      </Button>
    </VStack>
  );
};

export default Index;
