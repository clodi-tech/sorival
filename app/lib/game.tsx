import { Chip, Card, CardHeader, CardFooter, Image, Divider } from "@nextui-org/react";

const SIZE = 30;

export default function Game({ start, homeTeam, awayTeam, competition, isLineups }: any) {
    // calculate the remaining time in minutes
    const now = new Date();
    const gameDate = new Date(start);
    const remainingTime = gameDate.getTime() - now.getTime();
    const remainingMinutes = Math.floor(remainingTime / 60000);

    return (
        <Card className="p-1 m-2">
            <CardHeader className="grid grid-cols-3 items-center gap-3">
                <div className="justify-self-end">{homeTeam.shortName}</div>
                <div className="flex justify-center items-center gap-3">
                    <Image alt="home logo"
                        width={SIZE} height={SIZE}
                        src={homeTeam.pictureUrl}
                        radius="none"
                    />
                    <Chip size='sm' radius='sm' color='warning' variant='flat'>{String(remainingMinutes)}m</Chip>
                    <Image alt="away logo"
                        width={SIZE} height={SIZE}
                        src={awayTeam.pictureUrl}
                        radius="none"
                    />
                </div>
                <div className="justify-self-start">{awayTeam.shortName}</div>
            </CardHeader>
            <Divider/>
            <CardFooter className="flex justify-center items-center p-0 gap-5">
                {isLineups && <Chip size='sm' radius='sm' color='secondary' variant='bordered'>H</Chip>}
                <div>{competition.displayName}</div>
                {isLineups && <Chip size='sm' radius='sm' color='secondary' variant='bordered'>A</Chip>}
            </CardFooter>
        </Card>
    );
}