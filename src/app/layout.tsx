import type {Metadata} from "next";
import {Inter, La_Belle_Aurore} from "next/font/google";
import "./globals.scss";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import React from "react";
import LoadingDialogProvider from "@/app/componments/loading-dialog-provider";
import ToastProvider from "@/app/componments/toast-provider";
import CustomGoogleAnalytics from "@/app/componments/google-analytics";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Essay grade",
    description: "Record your english essay",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();

    return (
        <html lang="en">
        <body className={`${inter.className} body`}>
        <CustomGoogleAnalytics></CustomGoogleAnalytics>
        <NextIntlClientProvider messages={messages}>
            <ToastProvider>
                <LoadingDialogProvider>
                    <div>
                        {children}
                    </div>
                </LoadingDialogProvider>
            </ToastProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
