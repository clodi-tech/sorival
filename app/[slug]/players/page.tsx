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

    const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    
    // generate all possible combination of lineups using both home and away players
    // each lineup must have: a list of players with all the properties, the number of home players, the number of away players, the total cap
    // the total cap of a lineup is the sum of the cap of all the players
    // the total cap of a lineup must be less than or equal to the cap of the game
    // one player per position
    // add an extra player that cannot be a goalkeeper and cannot be a duplicate
    // the extra player must be a player that is not already in the lineup

    return (
        <main>
            <div className="flex justify-center items-center border border-gray-600 rounded-2xl p-3 m-1">
                <div className="flex flex-col items-center">
                    <Image src={homeTeam.pictureUrl} alt="home logo" width={SIZE} height={SIZE} />
                    <span>{homeTeam.shortName}</span>
                </div>
                <span className="mx-2">{game.cap}</span>
                <div className="flex flex-col items-center">
                    <Image src={awayTeam.pictureUrl} alt="away logo" width={SIZE} height={SIZE} />
                    <span>{awayTeam.shortName}</span>
                </div>
            </div>
            <Slider />
            <div className='text-center m-4'>{JSON.stringify(homeIds, null, 2)}</div>
            <div className='text-center m-4'>{JSON.stringify(homePlayers, null, 2)}</div>
            <div className='text-center m-4'>{JSON.stringify(awayIds, null, 2)}</div>
            <div className='text-center m-4'>{JSON.stringify(awayPlayers, null, 2)}</div>
        </main>
    );
}
