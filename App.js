import React, { useEffect, useState } from 'react';
import { getCryptoPrices } from './services/cryptoService';
import { getTopTokens } from './services/uniswapService';
import { Line } from 'react-chartjs-2';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const App = () => {
  const [cryptoPrices, setCryptoPrices] = useState({});
  const [topTokens, setTopTokens] = useState([]);

  const cryptoIds = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin'];

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getCryptoPrices(cryptoIds);
      setCryptoPrices(prices);
    };

    const fetchTopTokens = async () => {
      const tokens = await getTopTokens();
      setTopTokens(tokens);
    };

    fetchPrices();
    fetchTopTokens();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Crypto Price Tracker</Typography>
      
      <div>
        <Typography variant="h6">Prices:</Typography>
        {cryptoIds.map(id => (
          <div key={id}>
            {id}: ${cryptoPrices[id]?.usd}
          </div>
        ))}
      </div>
      
      <div>
        <Typography variant="h6">Top Tokens by 24h Trading Volume:</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell align="right">Volume (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>{token.name}</TableCell>
                  <TableCell>{token.symbol}</TableCell>
                  <TableCell align="right">${parseFloat(token.volumeUSD).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

export default App;
