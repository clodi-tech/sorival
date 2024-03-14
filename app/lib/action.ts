import { GraphQLClient, gql } from 'graphql-request';

// read the api url
const apiUrl = process.env.SORARE_API_URL;
if (!apiUrl) {
    throw new Error('SORARE_API_URL is not defined');
}

// create the client
const graphQLClient = new GraphQLClient(apiUrl, { headers: {} });

export async function fetch() {
    // define the query
    const test = gql`{ football { rivals { nextGame { cap formationKnown slug } } } }`;

    try {
        // send the request
        const data = await graphQLClient.request(test);
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the data');
    }
}
