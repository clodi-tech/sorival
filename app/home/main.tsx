import { nextGames } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_TEAM_URL = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
const SIZE = 25;

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games
    .filter((game: any) => game.formationKnown)
    .map((game: any) => {
        game.game.homeTeam.pictureUrl = game.game.homeTeam.pictureUrl || DEFAULT_TEAM_URL;
        game.game.awayTeam.pictureUrl = game.game.awayTeam.pictureUrl || DEFAULT_TEAM_URL;
        return game;
    });

    const GameLink = ({ game }: { game: any }) => (
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
    );

    return (
        <main>
            {gamesWithFormation.length > 0 ? (
                <>
                    <div>upcoming games</div>
                    {gamesWithFormation.map((game: any) => <GameLink key={game.id} game={game} />)}
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
