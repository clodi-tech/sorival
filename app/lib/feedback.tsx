import {Popover, PopoverTrigger, PopoverContent, Button, Textarea} from '@nextui-org/react';

export default function Feedback() {
    return (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(30px)' }}>
            <Popover placement="bottom" offset={10} backdrop='blur'>
                <PopoverTrigger>
                    <Button color="primary" variant='faded' size='sm'>feedback</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] gap-3 p-3 border border-gray-700">
                    <Textarea label="thank you for your valuable feedback!" labelPlacement='outside'
                        variant="bordered" placeholder="tell me what you like or don't like about the app. I will make it better. thank you."
                        disableAnimation autoFocus disableAutosize radius='sm'
                        classNames={{
                        base: "max-w-xs",
                        input: "resize-y min-h-[80px]",}}/>
                    <Button color="primary" size='sm'>SEND</Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
