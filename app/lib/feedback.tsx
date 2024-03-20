'use client';

import { Button, Textarea} from '@nextui-org/react';
import { useState } from 'react';

export default function Feedback() {
    const [message, setMessage] = useState('');

    return (
        <>
            <Textarea label="thank you for your valuable feedback!" labelPlacement='outside'
                variant="bordered" placeholder="tell me what you like or don't like about the app. I will make it better. thank you."
                disableAnimation autoFocus disableAutosize radius='sm'
                value={message} onValueChange={setMessage}
                classNames={{
                base: "max-w-xs",
                input: "resize-y min-h-[80px]",}}/>
            <Button color="primary" size='sm' onPress={() => console.log(message)}>SEND</Button>
        </>
    );
}
