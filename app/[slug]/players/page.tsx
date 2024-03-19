import { startingLineup } from '@/app/lib/actions';
import Image from 'next/image';
import Lineups from '@/app/lib/lineups';

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;
const TOP = 10;

export default async function Page({ params }: { params: { slug: string } }) {
    const data: any = await startingLineup(params.slug);

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

    function getTopLineups(lineups: any[], homeCount: any) {
        return lineups
            .filter((lineup: any) => lineup.homeCount === homeCount)
            .sort((a: any, b: any) => b.totalCap - a.totalCap)
            .slice(0, TOP);
    }

    const topLineups = [5, 4, 3, 2, 1, 0].flatMap(homeCount => getTopLineups(lineups, homeCount));

    return (
        <main>
            <div className='flex justify-center items-center border border-gray-600 rounded-2xl p-3 m-1'>
                <div className='flex flex-col items-center'>
                    <Image src={homeTeam.pictureUrl} alt='home logo' width={SIZE} height={SIZE} />
                    <span>{homeTeam.shortName}</span>
                </div>
                <span className='mx-2'>VS</span>
                <div className='flex flex-col items-center'>
                    <Image src={awayTeam.pictureUrl} alt='away logo' width={SIZE} height={SIZE} />
                    <span>{awayTeam.shortName}</span>
                </div>
            </div>
            <Lineups topLineups={topLineups} />
        </main>
    );
}
