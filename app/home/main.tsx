import { nextGames } from "../lib/actions";
import Link from "next/link";

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    return (
        <main>
            {gamesWithFormation.length > 0 ? (
                <>
                    <div>upcoming games</div>
                    {gamesWithFormation.map((game: any) => (
                        <Link href={`/${game.slug}/players`}>{game.slug} {game.cap}</Link>
                    ))}
                </>
            ) : <div>no upcoming games.<br></br>come back later.</div>}
        </main>
    );
}
