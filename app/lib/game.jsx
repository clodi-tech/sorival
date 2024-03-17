import Link from 'next/link'

export default function Game(props) {
    return (
        <Link href={`/${props.slug}/players`}>{props.slug} {props.cap}</Link>
    )
}
