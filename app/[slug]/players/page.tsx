import { startingLineup } from '@/app/lib/actions';
import Game from '@/app/lib/game';
import Lineups from '@/app/lib/lineups';

export default async function Page({ params }: { params: { slug: string } }) {
    const {gameCap, date, competition, homeTeam, awayTeam, topLineups } = await startingLineup(params.slug);

    return (
        <main className='gap-4'>
            <Game start={date} competition={competition} homeTeam={homeTeam} awayTeam={awayTeam} isLineups={true} />
            <Lineups topLineups={topLineups} gameCap={gameCap} />
        </main>
    );
}
