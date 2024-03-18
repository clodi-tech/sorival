import { startingLineup } from '@/app/lib/actions';
import Image from 'next/image';

const DEFAULT_PIC_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;

export default async function Page({ params }: { params: { slug: string } }) {
    const data: any = await startingLineup(params.slug);

    // prepare the data
    const game = data.football.rivals.game;
    const homeTeam = game.game.homeTeam;
    const awayTeam = game.game.awayTeam;
    homeTeam.pictureUrl = homeTeam.pictureUrl || DEFAULT_PIC_URL;
    awayTeam.pictureUrl = awayTeam.pictureUrl || DEFAULT_PIC_URL;
    const homeLineup = game.game.homeFormation.startingLineup.flat();
    const awayLineup = game.game.awayFormation.startingLineup.flat();

    // render the teams on top and the home players on the left, away players on the right
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
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <span>only home</span>
                    {homeLineup.map((player: any) => (
                        <div key={player.id} className="border rounded p-4 flex flex-col items-center">
                            <Image src={player.squaredPictureUrl} alt='player pic' width={SIZE} height={SIZE} className="mb-2" />
                            <div className="flex justify-between w-full">
                                <span>{player.lastFifteenSo5Appearances}</span>
                                <span>{player.displayName}</span>
                            </div>
                            <span className="text-sm mt-2">{player.position}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <span>mixed</span>
                </div>
                <div>
                    <span>only away</span>
                    {awayLineup.map((player: any) => (
                        <div key={player.id} className="border rounded p-4 flex flex-col items-center">
                            <Image src={player.squaredPictureUrl} alt='player pic' width={SIZE} height={SIZE} className="mb-2" />
                            <div className="flex justify-between w-full">
                                <span>{player.lastFifteenSo5Appearances}</span>
                                <span>{player.displayName}</span>
                            </div>
                            <span className="text-sm mt-2">{player.position}</span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
