"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"

export function AppearanceSettings() {
    const [theme, setTheme] = useState("system")

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="text-base font-medium">Appearance settings</CardTitle>
                <CardDescription>
                    Update your account&apos;s appearance settings
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">

                        <p className="text-sm font-medium">Theme (Current: {theme})</p>

                        <Tabs
                            value={theme}
                            onValueChange={(val) => {
                                console.log("Selected theme:", val)
                                setTheme(val)
                            }}
                            className="w-full"
                        >
                            <TabsList className="inline-flex h-10 gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                                <TabsTrigger value="light" className="flex items-center rounded-md px-3.5 py-1.5">
                                    <SunIcon className="-ml-1 h-4 w-4" />
                                    <span className="ml-1.5 text-sm">Light</span>
                                </TabsTrigger>

                                <TabsTrigger value="dark" className="flex items-center rounded-md px-3.5 py-1.5">
                                    <MoonIcon className="-ml-1 h-4 w-4" />
                                    <span className="ml-1.5 text-sm">Dark</span>
                                </TabsTrigger>

                                <TabsTrigger value="system" className="flex items-center rounded-md px-3.5 py-1.5">
                                    <MonitorIcon className="-ml-1 h-4 w-4" />
                                    <span className="ml-1.5 text-sm">System</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
