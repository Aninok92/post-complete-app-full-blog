import Link from "next/link";

import classes from './main-navigation.module.css'
import Logo from "./logo";


export default function MainNavigation({children}) {
    return (
        <header className={classes.header}>
            <Link href='/'>
                <Logo />
            </Link>
            <nav>
                <ul>
                    <li><Link href='/posts'>Posts</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                    <li><Link href="/auth">Login</Link></li>
                    <li><Link href="/profile">Profile</Link></li>
                </ul>
            </nav>
        </header>
    )
}