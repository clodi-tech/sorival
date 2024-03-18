import { nextGames } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_PIC_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    // check picture url for home and away teams and add default picture if missing
    gamesWithFormation.forEach((game: any) => {
        if (!game.game.homeTeam.pictureUrl) {
            game.game.homeTeam.pictureUrl = DEFAULT_PIC_URL;
        }
        if (!game.game.awayTeam.pictureUrl) {
            game.game.awayTeam.pictureUrl = DEFAULT_PIC_URL;
        }
    });

    return (
        <main>
            {gamesWithFormation.length > 0 ? (
                <>
                    <div>upcoming games</div>
                    {gamesWithFormation.map((game: any) => (
                        <Link href={`/${game.slug}/players`} key={game.id} className="flex justify-center items-center border border-gray-600 rounded-2xl p-3 m-1">
                            <div className="flex flex-col items-center">
                                <Image src={game.game.homeTeam.pictureUrl} alt="home logo" width={SIZE} height={SIZE} />
                                <span>{game.game.homeTeam.shortName}</span>
                            </div>
                            <span className="mx-2">VS</span>
                            <div className="flex flex-col items-center">
                                <Image src={game.game.awayTeam.pictureUrl} alt="away logo" width={SIZE} height={SIZE} />
                                <span>{game.game.awayTeam.shortName}</span>
                            </div>
                        </Link>
                    ))}
                </>
            ) : (
                <>
                    <div>no upcoming games.</div>
                    <div>come back later.</div>
                </>
            )}
        </main>
    );
}
