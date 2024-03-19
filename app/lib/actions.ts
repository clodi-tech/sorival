import { GraphQLClient, gql } from 'graphql-request';
import { unstable_noStore as noStore } from 'next/cache';

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';

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
        const data: any = await graphQLClient.request(query);

        // prepare the data
        const games = data.football.rivals.upcomingGames;
        const gamesWithFormation = games
        .filter((game: any) => game.formationKnown)
        .map((game: any) => {
            game.game.homeTeam.pictureUrl = game.game.homeTeam.pictureUrl || DEFAULT_TEAM_URL;
            game.game.awayTeam.pictureUrl = game.game.awayTeam.pictureUrl || DEFAULT_TEAM_URL;
            return game;
        });

        return gamesWithFormation;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to get the upcoming games');
    }
}

// get starting lineup
export async function startingLineup(slug: string) {
    noStore();

    const query = gql`query ($slug: String!) { football { rivals { game(slug: $slug) { id cap game {
        homeTeam { ... on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } }
        awayTeam { ... on Club { shortName pictureUrl } ... on NationalTeam { shortName pictureUrl } }
        homeFormation { startingLineup { id } }
        awayFormation { startingLineup { id } } }
        draftablePlayers { 
        ... on FootballRivalsDraftablePlayer { capValue pictureUrl position player { id } }
        ... on FootballRivalsDraftableCard { capValue pictureUrl position player { id } } } } } } }`;

    try {
        const data = await graphQLClient.request(query, { slug });
        return data;
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the starting lineup');
    }
}
