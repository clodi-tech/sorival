import Image from "next/image";
import { fetch } from "./lib/action";

export default async function Home() {
  const data: any = await fetch();

  // prepare the data
  const rivals = data.football.rivals.nextGame;
  const cap = rivals.cap;
  const formationKnown = String(rivals.formationKnown);
  const slug = rivals.slug;

  return (
    <div className="parent">
      <header>
        <Image src="/logo.svg" alt="logo"
            width={50}
            height={50}
            priority={true}/>
      </header>
      <div className="left-side"></div>
      <main>
        <div>{slug}</div>
        <div>next game cap {cap}</div>
        <div>formation known: {formationKnown}</div>
      </main>
      <div className="right-side section yellow"></div>
      <footer>
        <div>a project by <a href="https://sonolibero.io" target="_blank">libero</a></div>
        <div>© 2092</div>
      </footer>
    </div>
  );
}
