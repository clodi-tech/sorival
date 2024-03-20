import { startingLineup } from '@/app/lib/actions';
import Lineups from '@/app/lib/lineups';
import {Card, CardHeader, CardFooter, Image, Divider} from "@nextui-org/react";

const SIZE = 30;

export default async function Page({ params }: { params: { slug: string } }) {
    const {competition, homeTeam, awayTeam, topLineups } = await startingLineup(params.slug);

    return (
        <main>
            <Card className="p-1 m-2">
                <CardHeader className="flex gap-3">
                    <div>{homeTeam.shortName}</div>
                    <Image alt="home logo"
                        width={SIZE} height={SIZE}
                        src={homeTeam.pictureUrl}
                        radius="sm"
                    />
                    <div>VS</div>
                    <Image alt="away logo"
                        width={SIZE} height={SIZE}
                        src={awayTeam.pictureUrl}
                        radius="sm"
                    />
                    <div>{awayTeam.shortName}</div>
                </CardHeader>
                <Divider/>
                <CardFooter className="flex justify-center items-center p-0">
                    {competition.displayName}
                </CardFooter>
            </Card>
            <Lineups topLineups={topLineups} />
        </main>
    );
}
