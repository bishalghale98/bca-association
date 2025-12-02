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
                            className="w-full "
                        >
                            <TabsList
                                className="
    flex items-center gap-2
    sm:gap-1
    p-1
    rounded-lg
    bg-neutral-100 dark:bg-neutral-800
    w-full sm:w-auto
  "
                            >
                                <TabsTrigger
                                    value="light"
                                    className="
      flex items-center justify-center gap-2
      px-3 py-2 rounded-md
      transition
      data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
      data-[state=active]:text-foreground
      hover:bg-white/60 dark:hover:bg-neutral-700/60
    "
                                >
                                    <SunIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline text-sm">Light</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="dark"
                                    className="
      flex items-center justify-center gap-2
      px-3 py-2 rounded-md
      transition
      data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
      data-[state=active]:text-foreground
      hover:bg-white/60 dark:hover:bg-neutral-700/60
    "
                                >
                                    <MoonIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline text-sm">Dark</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="system"
                                    className="
      flex items-center justify-center gap-2
      px-3 py-2 rounded-md
      transition
      data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700
      data-[state=active]:text-foreground
      hover:bg-white/60 dark:hover:bg-neutral-700/60
    "
                                >
                                    <MonitorIcon className="h-4 w-4" />
                                    <span className="hidden sm:inline text-sm">System</span>
                                </TabsTrigger>
                            </TabsList>


                        </Tabs>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
