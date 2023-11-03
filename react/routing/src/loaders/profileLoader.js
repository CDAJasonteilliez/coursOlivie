import { isLoggedIn } from "../api/allRequest";

export async function profileLoader() {
    const user = await isLoggedIn();
    return user;
}