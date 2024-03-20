import Image from 'next/image'
import Link from 'next/link';
import Feedback from '../lib/feedback';
import { Popover, PopoverTrigger, PopoverContent, Button } from '@nextui-org/react';

export default function Header() {
    return (
        <header>
            <Link href='/'>
                <Image src='/logo.svg' alt='logo'
                    width={50} height={50}
                    priority={true}/>
            </Link>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(30px)' }}>
                <Popover placement="bottom" offset={10} backdrop='blur'>
                    <PopoverTrigger>
                        <Button color="primary" variant='faded' size='sm'>feedback</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] gap-3 p-3 border border-gray-700">
                        <Feedback />
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}
