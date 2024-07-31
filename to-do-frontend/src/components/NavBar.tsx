"use client"
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Route(props: React.PropsWithChildren<{ href: string }>) {
    const pathname = usePathname();
    const condition = (pathname == "/" && "/" == props.href) || (props.href != "/" && pathname.indexOf(props.href) == 0);
    const style = "hover:text-gray-600" + (condition && " font-bold");
    return (<Link href={props.href} className={style}>{props.children}</Link>);
}

export default function NavBar() {
    const { user } = useAuthContext();
    const router = useRouter();

    return (
        <div className="flex flex-row p-2 space-x-2 bg-blue-300">
            <div className="flex-1"></div>
            <Route href="/">Home</Route>
            <Route href="/about">About</Route>
            {user ? (
                <>
                    <Route href="/todos">To Do List</Route>
                    <Route href="/admin">Admin</Route>
                    <Route href="/logout">Logout</Route>
                </>) :
                (<>
                    <Route href="/signin">Sign In</Route>
                    <Route href="/signup">Sign Up</Route>
                </>
                )
            }
        </div>
    );
}
