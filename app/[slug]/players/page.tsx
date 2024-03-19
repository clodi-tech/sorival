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
    const homeLineup = game.game.homeFormation.startingLineup.flat();
    const awayLineup = game.game.awayFormation.startingLineup.flat();

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
        </main>
    );
}
