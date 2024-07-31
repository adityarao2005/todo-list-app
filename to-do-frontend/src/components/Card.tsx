import { propagateServerField } from "next/dist/server/lib/render-server";
import React from "react";

export default function Card({ children, className = "bg-black" }: React.PropsWithChildren<{ className?: string }>) {
    return (
        <div className={`flex flex-row ${className}`}>
            <div className="flex-1"></div>
            <div className={`flex flex-col`}>
                <div className="flex-1"></div>
                <div className="flex-1 flex flex-row">
                    <div className="flex-1"></div>
                    {children}
                    <div className="flex-1"></div>
                </div>
                <div className="flex-1"></div>
            </div>
            <div className="flex-1"></div>
        </div>
    );
}