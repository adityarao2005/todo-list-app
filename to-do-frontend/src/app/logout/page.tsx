"use client"
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "@/firebase/auth/signout";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Logout() {
    useEffect(() => {
        signOut();
    }, []);

    return (
        <div>
            You{"\'"}ve successfully logged out.
            <Link href="/login">Login</Link>
        </div>
    );
}
