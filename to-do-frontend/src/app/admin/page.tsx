'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    if (!user) {
        router.push("/")
        return
    }

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;