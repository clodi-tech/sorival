import { GraphQLClient, gql } from 'graphql-request';
import { unstable_noStore as noStore } from 'next/cache';

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const TOP = 10;

// read the api url
const apiUrl = process.env.SORARE_API_URL;
if (!apiUrl) {
    throw new Error('SORARE_API_URL is not defined');
}

// create the client
const graphQLClient = new GraphQLClient(apiUrl, { headers: {} });

// get the top lineups
function getTopLineups(lineups: any[], homeCount: any) {
    return lineups
        .filter((lineup: any) => lineup.homeCount === homeCount)
        .sort((a: any, b: any) => b.totalCap - a.totalCap)
        .slice(0, TOP);
}

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
        const data: any = await graphQLClient.request(query, { slug });

        // prepare the data
        const game = data.football.rivals.game;
        const { homeTeam, awayTeam, homeFormation, awayFormation } = game.game;

        homeTeam.pictureUrl = homeTeam.pictureUrl || DEFAULT_TEAM_URL;
        awayTeam.pictureUrl = awayTeam.pictureUrl || DEFAULT_TEAM_URL;

        const homeIds = homeFormation.startingLineup.flat().map((player: any) => player.id);
        const awayIds = awayFormation.startingLineup.flat().map((player: any) => player.id);

        const allPlayers = game.draftablePlayers.filter((player: any) => homeIds.includes(player.player.id) || awayIds.includes(player.player.id));

        const allGK = allPlayers.filter((player: any) => player.position === 'Goalkeeper');
        const allDF = allPlayers.filter((player: any) => player.position === 'Defender');
        const allMF = allPlayers.filter((player: any) => player.position === 'Midfielder');
        const allFW = allPlayers.filter((player: any) => player.position === 'Forward');
        
        // generate all possible lineups with one player per position
        const lineups: any[] = [];
        const lineupKeys = new Set();

        for (const gk of allGK) {
            for (const df of allDF) {
                for (const mf of allMF) {
                    for (const fw of allFW) {
                        // generate the extra players
                        // cannot be goalkeeper, cannot be the same as the other players
                        const extra = allPlayers.filter((player: any) => player.position != 'Goalkeeper' && ![df, mf, fw].includes(player));

                        for (const ex of extra) {
                            // sum the cap of the lineup
                            const cap = gk.capValue + df.capValue + mf.capValue + fw.capValue + ex.capValue;

                            // add the lineup to the list if the cap is less than the game cap
                            if (cap <= game.cap) {
                                // sort and concatenate the players id to build a unique key
                                const key = [gk, df, mf, fw, ex].map((player: any) => player.player.id).sort().join('');

                                // if the lineup is not already in the list
                                if (lineupKeys.has(key)) {
                                    continue;
                                }
        
                                lineupKeys.add(key);

                                // count the number of home and away players
                                const players = [gk, df, mf, fw, ex];
                                const homeCount = players.filter((player: any) => homeIds.includes(player.player.id)).length;
                                const awayCount = players.filter((player: any) => awayIds.includes(player.player.id)).length;

                                lineups.push({
                                    'key': key,
                                    'players': players,
                                    'totalCap': cap,
                                    'homeCount': homeCount,
                                    'awayCount': awayCount
                                });
                            }
                        }
                    }
                }
            }
        }

        const topLineups = [5, 4, 3, 2, 1, 0].flatMap(homeCount => getTopLineups(lineups, homeCount));
        return {homeTeam, awayTeam, topLineups};
    } 
    catch (error) {
        console.log(error);
        throw new Error('failed to fetch the starting lineup');
    }
}
