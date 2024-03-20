import { Chip, Card, CardHeader, CardFooter, Image, Divider } from "@nextui-org/react";

const SIZE = 30;

export default function Game({ homeTeam, awayTeam, competition, isLineups }: any) {
    return (
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
            <CardFooter className="flex justify-center items-center p-0 gap-5">
                {isLineups && <Chip size='sm' radius='sm' color='secondary' variant='bordered'>H</Chip>}
                <div>{competition.displayName}</div>
                {isLineups && <Chip size='sm' radius='sm' color='secondary' variant='bordered'>A</Chip>}
            </CardFooter>
        </Card>
    );
}