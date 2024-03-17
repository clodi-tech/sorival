import { nextGames } from "../lib/actions";
import Game from "../lib/game";

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    return (
        <main>
            <div>upcoming games</div>
            {gamesWithFormation.map((game: any) => (
                <Game key={game.id} {...game} />
            ))}
        </main>
    );
}
