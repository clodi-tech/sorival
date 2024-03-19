import { startingLineup } from '@/app/lib/actions';
import Image from 'next/image';
import Lineups from '@/app/lib/lineups';

const SIZE = 25;

export default async function Page({ params }: { params: { slug: string } }) {
    const {competition, homeTeam, awayTeam, topLineups } = await startingLineup(params.slug);

    return (
        <main>
            <span>{competition.displayName}</span>
            <div className='flex justify-center items-center border border-gray-600 rounded-2xl p-3 m-1'>
                <div className='flex flex-col items-center'>
                    <Image src={homeTeam.pictureUrl} alt='home logo' width={SIZE} height={SIZE} />
                    <span>{homeTeam.shortName}</span>
                </div>
                <span className='mx-2'>VS</span>
                <div className='flex flex-col items-center'>
                    <Image src={awayTeam.pictureUrl} alt='away logo' width={SIZE} height={SIZE} />
                    <span>{awayTeam.shortName}</span>
                </div>
            </div>
            <Lineups topLineups={topLineups} />
        </main>
    );
}
