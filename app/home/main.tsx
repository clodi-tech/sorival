import { nextGame } from "../lib/actions";

export default async function Main() {
    const data: any = await nextGame();

    // prepare the data
    const rivals = data.football.rivals.nextGame;
    const cap = rivals.cap;
    const formationKnown = String(rivals.formationKnown);
    const slug = rivals.slug;

    return (
        <main>
            <div>{slug}</div>
            <div>next game cap {cap}</div>
            <div>formation known: {formationKnown}</div>
        </main>
    );
}
