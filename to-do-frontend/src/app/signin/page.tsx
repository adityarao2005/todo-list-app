
'use client'
import React from "react";
import { signInCredentials, signInGoogle } from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Container from "@/components/Container";
import Card from "@/components/Card";
import GoogleButton from "@/components/GoogleButton";

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault()

        const { result, error } = await signInCredentials(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }


    const onGoogleClick = async () => {
        const { result, error } = await signInGoogle();

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }

    return (
        <Card className="bg-black flex-1">
            <div className="bg-white p-10 rounded-xl space-y-3 w-96">

                <h1 className="text-4xl font-bold text-center pb-3">Welcome</h1>

                <div className="text-center">Login to {process.env.NEXT_PUBLIC_APP_PUBLISHER} to continue to {process.env.NEXT_PUBLIC_APP_NAME}</div>

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

                <div>Don{"\'"}t have an account? <Link href="/signup" className="text-blue-600 hover:text-blue-600 font-bold">Sign up</Link></div>
                <div className="flex flex-row space-x-2">
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1"></div>
                        <hr className="h-1 text-black bg-black"></hr>
                        <div className="flex-1"></div>
                    </div>
                    <div>OR</div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1"></div>
                        <hr className="h-1 text-black bg-black"></hr>
                        <div className="flex-1"></div>
                    </div>
                </div>
                <GoogleButton onClick={onGoogleClick}></GoogleButton>
            </div>
        </Card>
    );
}

export default Page;