"use client";

import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

type DeleteAccountCardProps = {
    title?: string;
    description?: string;
    alertDescription?: string;
    onDelete: () => void;
};

const DeleteAccountCard: React.FC<DeleteAccountCardProps> = ({
    title = "Delete Account",
    description = "Permanently delete your account and all of its resources",
    alertDescription = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    onDelete,
}) => {
    return (
        <Card className="mt-8 border-destructive/20">
            <CardHeader>
                <CardTitle className="text-destructive">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>
                        <strong>Warning:</strong> {alertDescription}
                    </AlertDescription>
                </Alert>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">{title}</Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete Account
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
};

export default DeleteAccountCard;
