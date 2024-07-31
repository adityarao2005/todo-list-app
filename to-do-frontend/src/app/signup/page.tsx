'use client'
import React from "react";
import { signUp } from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Card from "@/components/Card";
import GoogleButton from "@/components/GoogleButton";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }


    return (
        <Card className="bg-black flex-1">
            <div className="bg-white p-10 rounded-xl space-y-3 w-96">

                <h1 className="text-4xl font-bold text-center pb-3">Welcome</h1>

                <div className="text-center">Sign up {process.env.NEXT_PUBLIC_APP_PUBLISHER} and continue to {process.env.NEXT_PUBLIC_APP_NAME}</div>

                <form onSubmit={handleForm} className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="Email" className="w-full rounded p-2" style={{ border: "1px solid" }} />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="Password" className="w-full rounded p-2" style={{ border: "1px solid" }} />
                    </label>
                    <button className="w-full h-full bg-blue-600 text-white p-3" type="submit">Continue</button>
                </form>

                <div>Have an account already? <Link href="/signin" className="text-blue-600 hover:text-blue-600 font-bold">Sign in</Link></div>
                
            </div>
        </Card>
    );
}

export default Page;