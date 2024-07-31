"use client"
import Card from "@/components/Card";
import Container from "@/components/Container";
import { useAuthContext } from "@/context/AuthContext";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";

interface ToDoItem {
    id: string;
    title: string;
    completed: boolean;
}

interface DispatchEvent {
    type: "ADD" | "REMOVE" | "TOGGLE" | "FETCH";
    payload?: ToDoItem | ToDoItem[];
    user?: User;
}

const reducer = (state: ToDoItem[], action: DispatchEvent) => {
    switch (action.type) {
        case "FETCH":
            // Get the payload and send it to the server
            return action.payload ? action.payload as ToDoItem[] : [];

        case "ADD":
            // Send to server
            // Update UI
            return [...state, action.payload as ToDoItem];
        case "REMOVE":
            // Send to server
            // Update UI
            return state.filter((item) => item.id !== (action.payload as ToDoItem).id);
        case "TOGGLE":
            // Send to server
            // Update UI
            return state.map((item) => {
                if (item.id === (action.payload as ToDoItem).id) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            });
        default:
            return state;
    }
};

export default function ToDos() {
    const { user } = useAuthContext()
    const router = useRouter()


    const initialItem: ToDoItem[] = [];

    const [tasks, dispatch] = useReducer(reducer, initialItem);


    const fetchTask = useCallback(async () => {

        const response = await fetch('/api/todos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${await user?.getIdToken()}`
            },
        });
        const data = await response.json() as ToDoItem[];

        dispatch({ type: "FETCH", payload: data });
    }, [user])


    const addTask = async () => {

        const title = prompt("Enter Task Name");

        if (title == null) return;
        const task = { title: title, completed: false } as ToDoItem;

        const response = await fetch('/api/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${await user?.getIdToken()}`
            },
            body: JSON.stringify(task)
        });
        if (response.status !== 200)
            console.error("Something went wrong")

        dispatch({ type: "ADD", payload: task });
        await fetchTask()
    };

    const removeTask = async (item: ToDoItem) => {


        const response = await fetch(`/api/todos/${item.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${await user?.getIdToken()}`
            }
        });
        if (response.status !== 200)
            console.error("Something went wrong")
        dispatch({ type: "REMOVE", payload: item });

        await fetchTask()
    }

    const toggleTask = async (item: ToDoItem) => {

        const response = await fetch(`/api/todos/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${await user?.getIdToken()}`
            },
            body: JSON.stringify({ completed: !item.completed, title: item.title })
        });
        if (response.status !== 200)
            console.error("Something went wrong")

        dispatch({ type: "TOGGLE", payload: item });

        await fetchTask()
    }

    React.useEffect(() => {
        fetchTask();
    }, [fetchTask])

    if (!user) {
        router.push("/");
        return;
    }

    return (
        <Card className="bg-black flex-1">
            <div className="bg-white p-10 m-10 flex-col rounded" style={{ width: "50vw" }}>
                <h1 className="text-4xl font-bold text-center pb-3">To Do{"\'"}s Page</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Tasks</h2>
                    <button onClick={addTask} className="bg-blue-500 text-white px-2 py-1 font-bold rounded-lg">Add Task</button>
                    <table className="table-auto w-full rounded bg-white border border-gray-300">
                        <thead className="bg-green-500 rounded text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Task Name</th>
                                <th className="border border-gray-300 px-4 py-2">Completed</th>
                                <th className="border border-gray-300 px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((item) => (
                                    <tr key={item.id} className="hover:bg-green-100">
                                        <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" value="" checked={item.completed} onChange={() => toggleTask(item)} className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{item.completed ? "Completed" : "Incomplete"}</span>
                                            </label>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button onClick={() => removeTask(item)} className="bg-red-500 text-white px-2 py-1 font-bold rounded-lg">Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}
