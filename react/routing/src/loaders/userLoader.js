import { getUsers } from "../api/allRequest";

export async function userLoader() {
    const users = await getUsers();
    return users;
}
