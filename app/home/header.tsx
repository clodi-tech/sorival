import Image from 'next/image'
import Link from 'next/link';
import Feedback from '../lib/feedback';

export default function Header() {
    return (
        <header>
            <Link href='/'>
                <Image src='/logo.svg' alt='logo'
                    width={50} height={50}
                    priority={true}/>
            </Link>
        </header>
    );
}
