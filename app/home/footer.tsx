import { Link } from "@nextui-org/react";

export default function Footer() {
    return (
        <footer>
            <div>a project by
                <Link isBlock isExternal showAnchorIcon href="https://sonolibero.io" color="primary">
                    libero
                </Link>
            </div>
            <div>© 2092</div>
        </footer>
    );
}
