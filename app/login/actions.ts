"use server";

import { InvalidCredentials, NotVerified, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleLogin(previousState: string, formData: FormData) {
    try {
        await signIn("credentials", {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            redirect: false
        });

        // Refresh the navbar to show the user as logged in
        revalidatePath("/", "layout");

        redirect("/");
    } catch (e) {
        if (e instanceof InvalidCredentials || e instanceof NotVerified) {
            return e.code;
        }
        throw e;
    }
}