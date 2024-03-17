import { draftablePlayers } from '@/app/lib/actions';

export default async function Page({ params }: { params: { slug: string } }) {
    const data: any = await draftablePlayers(params.slug);

    // prepare the data
    const players = data.football.rivals.game.draftablePlayers;

    return (
        <main>
            <div>{params.slug}</div>
            {players.map((player: any) => (
                <div key={player.id}>
                    {player.player.displayName} {player.position} {player.capValue} {player.player.activeClub.name}
                </div>
            ))}
        </main>
    );
}
