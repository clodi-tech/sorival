import { startingLineup } from '@/app/lib/actions';
import Image from 'next/image';
import Slider from '@/app/lib/slider';

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;

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
    for (const gk of allGK) {
        for (const df of allDF) {
            for (const mf of allMF) {
                for (const fw of allFW) {
                    // generate the extra players
                    // cannot be goalkeeper, cannot be the same as the other players
                    let extra = allPlayers.filter((player: any) => player.position != 'Goalkeeper');
                    extra = extra.filter((player: any) => ![df, mf, fw].includes(player));

                    for (const ex of extra) {
                        // sum the cap of the lineup
                        const cap = gk.capValue + df.capValue + mf.capValue + fw.capValue + ex.capValue;

                        // add the lineup to the list if the cap is less than the game cap
                        if (cap <= game.cap) {
                            // sort and concatenate the players id to build a unique key
                            const key = [gk, df, mf, fw, ex].map((player: any) => player.player.id).sort().join('');

                            // if the lineup is not already in the list
                            if (lineups.find(lineup => lineup.key === key)) {
                                continue;
                            }

                            // count the number of players from the home team
                            const homeCount = [gk, df, mf, fw, ex].filter((player: any) => homeIds.includes(player.player.id)).length;

                            // count the number of players from the away team
                            const awayCount = [gk, df, mf, fw, ex].filter((player: any) => awayIds.includes(player.player.id)).length;

                            lineups.push({
                                'key': key,
                                'players': [gk, df, mf, fw, ex],
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

    const topLineups = lineups
    .filter(lineup => lineup.homeCount === 5)
    .sort((a, b) => b.totalCap - a.totalCap)
    .slice(0, 5);

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
            <Slider />
            {topLineups.map((lineup, index) => (
                <div key={index} className='border border-gray-600 rounded-2xl p-3 m-1'>
                    <div className='flex justify-center items-center'>
                        {lineup.players.map((player: any, index: any) => (
                            <div key={index} className='flex flex-col justify-center items-center mr-1 ml-1'>
                                <Image src={player.pictureUrl} alt='player picture' width={50} height={81} />
                                <span>{player.capValue}</span>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center'>
                        <span>{lineup.totalCap}</span>
                    </div>
                </div>
            ))}
        </main>
    );
}
