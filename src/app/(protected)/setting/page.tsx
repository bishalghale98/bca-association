'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DeleteAccountCard from '@/components/Common/DeleteAccountCard';
import Profile from '@/components/protected/setting/Profile';
import Password from '@/components/protected/setting/Password';
import { AppearanceSettings } from '@/components/protected/setting/AppearanceSettings';

export default function SettingsPage() {




  const handleDeleteAccount = () => {
    // Handle account deletion here
    console.log('Account deletion requested');
  };



  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile and account settings
        </p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">

        <Separator className="lg:hidden" />

        {/* Main Content */}
        <div className="flex-1 lg:max-w-2xl">
          <Tabs defaultValue="profile" className="space-y-6 ">
            <TabsList className="grid w-auto  grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Profile />
            </TabsContent>

            <TabsContent value="password">
              <Password />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
          </Tabs>

          {/* Delete Account Section */}
          <DeleteAccountCard onDelete={handleDeleteAccount} />
        </div>
      </div>
    </div>
  );
}