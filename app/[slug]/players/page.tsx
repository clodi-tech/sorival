import { startingLineup } from '@/app/lib/actions';
import Image from 'next/image';
import Slider from '@/app/lib/slider';

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;

export default async function Page({ params }: { params: { slug: string } }) {
    const data: any = await startingLineup(params.slug);

    // prepare the data
    const game = data.football.rivals.game;
    const homeTeam = game.game.homeTeam;
    const awayTeam = game.game.awayTeam;
    homeTeam.pictureUrl = homeTeam.pictureUrl || DEFAULT_TEAM_URL;
    awayTeam.pictureUrl = awayTeam.pictureUrl || DEFAULT_TEAM_URL;
    const homeIds = game.game.homeFormation.startingLineup.flat().map((player: any) => player.id);
    const awayIds = game.game.awayFormation.startingLineup.flat().map((player: any) => player.id);
    const homePlayers = game.draftablePlayers.filter((player: any) => homeIds.includes(player.player.id));
    const awayPlayers = game.draftablePlayers.filter((player: any) => awayIds.includes(player.player.id));
    const allPlayers = homePlayers.concat(awayPlayers);

    const allGK = allPlayers.filter((player: any) => player.position === 'Goalkeeper');
    const allDF = allPlayers.filter((player: any) => player.position === 'Defender');
    const allMF = allPlayers.filter((player: any) => player.position === 'Midfielder');
    const allFW = allPlayers.filter((player: any) => player.position === 'Forward');
    
    // generate all possible lineups with one player for position
    const lineups = [];
    for (const gk of allGK) {
        for (const df of allDF) {
            for (const mf of allMF) {
                for (const fw of allFW) {
                    // generate the extra players
                    // cannot be goalkeeper, cannot be the same as the other players
                    let extra = allPlayers.filter((player: any) => player.position != 'Goalkeeper');
                    extra = allPlayers.filter((player: any) => ![df, mf, fw].includes(player));

                    for (const ex of extra) {
                        // sum the cap of the lineup
                        const cap = gk.capValue + df.capValue + mf.capValue + fw.capValue + ex.capValue;

                        // add the lineup to the list if the cap is less than the game cap
                        if (cap <= game.cap) {
                            // count the number of players from the home team
                            const homeCount = [gk, df, mf, fw, ex].filter((player: any) => homeIds.includes(player.player.id)).length;

                            // count the number of players from the away team
                            const awayCount = [gk, df, mf, fw, ex].filter((player: any) => awayIds.includes(player.player.id)).length;
                            lineups.push({
                                'lineup': [gk, df, mf, fw, ex],
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

    return (
        <main>
            <div className='flex justify-center items-center border border-gray-600 rounded-2xl p-3 m-1'>
                <div className='flex flex-col items-center'>
                    <Image src={homeTeam.pictureUrl} alt='home logo' width={SIZE} height={SIZE} />
                    <span>{homeTeam.shortName}</span>
                </div>
                <span className='mx-2'>{game.cap}</span>
                <div className='flex flex-col items-center'>
                    <Image src={awayTeam.pictureUrl} alt='away logo' width={SIZE} height={SIZE} />
                    <span>{awayTeam.shortName}</span>
                </div>
            </div>
            <Slider />
            <div className='text-center m-4'>{JSON.stringify(lineups, null, 2)}</div>
        </main>
    );
}
