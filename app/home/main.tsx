import { nextGames } from '../lib/actions';
import Game from '../lib/game';
import Link from 'next/link';

export default async function Main() {
    const gamesWithFormation = await nextGames();

    const GameLink = ({ game }: { game: any }) => (
        <Link href={`/${game.slug}/players`} key={game.id} className='flex justify-center items-center rounded-2xl p-3 m-2'>
            <Game competition={game.game.competition} homeTeam={game.game.homeTeam} awayTeam={game.game.awayTeam} isLineups={false} />
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
