import { nextGames } from "../lib/actions";
import Link from "next/link";
import Image from "next/image";

export default async function Main() {
    const data: any = await nextGames();

    // prepare the data
    const games = data.football.rivals.upcomingGames;
    const gamesWithFormation = games.filter((game: any) => game.formationKnown);

    // check picture url for home and away teams and add default picture if missing
    games.forEach((game: any) => {
        if (!game.game.homeTeam.pictureUrl) {
            game.game.homeTeam.pictureUrl = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
        }
        if (!game.game.awayTeam.pictureUrl) {
            game.game.awayTeam.pictureUrl = 'https://sorare.com/assets/shield_none-uVtR8SvS.png';
        }
    });

    return (
        <main>
            {games.length > 0 ? (
                <>
                    <div>upcoming games</div>
                    {games.map((game: any) => (
                        <Link href={`/${game.slug}/players`} key={game.id}>
                            <Image src={game.game.homeTeam.pictureUrl} alt="home logo" width={25} height={25} />
                            <Image src={game.game.awayTeam.pictureUrl} alt="away logo" width={25} height={25} />
                            {game.game.homeTeam.name} - VS - {game.game.awayTeam.name}
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
