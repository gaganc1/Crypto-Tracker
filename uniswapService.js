import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

const UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3';

const client = new ApolloClient({
  uri: UNISWAP_SUBGRAPH_URL,
  cache: new InMemoryCache()
});

const TOP_TOKENS_QUERY = gql`
  {
    tokens(orderBy: volumeUSD, orderDirection: desc, first: 5) {
      id
      symbol
      name
      volumeUSD
    }
  }
`;

export const getTopTokens = async () => {
  const response = await client.query({
    query: TOP_TOKENS_QUERY
  });
  return response.data.tokens;
};
