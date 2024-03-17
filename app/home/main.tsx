import { nextGame } from "../lib/actions";
import Game from "../lib/game";

export default async function Main() {
    const data: any = await nextGame();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    return (
        <main>
            <div>Upcoming games</div>
            {gamesWithFormation.map((game: any) => (
                <Game cap={game.cap} slug={game.slug} />
            ))}
        </main>
    );
}
