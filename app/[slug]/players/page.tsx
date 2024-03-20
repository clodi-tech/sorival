import { startingLineup } from '@/app/lib/actions';
import Game from '@/app/lib/game';
import Lineups from '@/app/lib/lineups';

export default async function Page({ params }: { params: { slug: string } }) {
    const {gameCap, competition, homeTeam, awayTeam, topLineups } = await startingLineup(params.slug);

    return (
        <main>
            <Game competition={competition} homeTeam={homeTeam} awayTeam={awayTeam} isLineups={true} />
            <Lineups topLineups={topLineups} gameCap={gameCap} />
        </main>
    );
}
