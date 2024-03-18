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

    const query = gql`{ football { rivals { upcomingGames (onlyInvited: false) { id cap formationKnown slug game { awayTeam { 
        ...on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } } homeTeam { 
        ...on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } } } } } } }`;

    try {
        const data = await graphQLClient.request(query);
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the data');
    }
}

// get starting lineup
export async function startingLineup(slug: string) {
    noStore();

    const query = gql`query ($slug: String!) { football { rivals { game(slug: $slug) { id cap game {
        homeTeam { ... on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } }
        awayTeam { ... on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } }
        homeFormation { startingLineup { id displayName position lastFifteenSo5Appearances squaredPictureUrl } }
        awayFormation { startingLineup { id displayName position lastFifteenSo5Appearances squaredPictureUrl } } } } } } }`;

    try {
        const data = await graphQLClient.request(query, { slug });
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the data');
    }
}
