import { stackServerApp } from "@/stack/server"
import { cache } from "react"


// get user 
export const getAuthUser = cache(async () => {
    const user = await stackServerApp.getUser();
    return user;
})