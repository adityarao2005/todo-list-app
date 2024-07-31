"use client"
import Container from "@/components/Container";
import NavBar from "@/components/NavBar";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
	const { user } = useAuthContext();

	return (
		<Container>
			Hello {user ? user.email : 'Guest'}
		</Container>
	);
}
