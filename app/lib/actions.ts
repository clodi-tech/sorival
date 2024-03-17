import { GraphQLClient, gql } from 'graphql-request';
import { unstable_noStore as noStore } from 'next/cache';

// read the api url
const apiUrl = process.env.SORARE_API_URL;
if (!apiUrl) {
    throw new Error('SORARE_API_URL is not defined');
}

// create the client
const graphQLClient = new GraphQLClient(apiUrl, { headers: {} });

// get upcoming games
export async function nextGames() {
    noStore();

    // define the query
    const query = gql`{ football { rivals { upcomingGames (onlyInvited: false) { id cap formationKnown slug } } } }`;

    try {
        // send the request
        const data = await graphQLClient.request(query);
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the data');
    }
}

// get draftable players
export async function draftablePlayers(slug: string) {
    noStore();

    // define the query
    const query = gql`query ($slug: String!) { football { rivals { game(slug: $slug) { draftablePlayers {
                ... on FootballRivalsDraftablePlayer { capValue position licensed player { displayName activeClub { name } } }
                ... on FootballRivalsDraftableCard { capValue position player { displayName activeClub { name } } } } } } } }`;

    try {
        // send the request
        const data = await graphQLClient.request(query, { slug });
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the data');
    }
}
