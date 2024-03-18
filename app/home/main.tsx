import { nextGames } from "../lib/actions";
import Link from "next/link";

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    return (
        <main>
            {games.length > 0 ? (
                <>
                    <div>upcoming games</div>
                    {games.map((game: any) => (
                        <Link href={`/${game.slug}/players`} key={game.id}>
                            {game.game.awayTeam.name} - VS - {game.game.homeTeam.name}
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
