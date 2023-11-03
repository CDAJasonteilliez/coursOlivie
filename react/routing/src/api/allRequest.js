import { redirect } from "react-router-dom";

export async function getArticles() {
    const response = await fetch("http://localhost:8000/articles");
    if (response.ok) {
        return response.json();
    }
}

export async function getUsers() {
    const response = await fetch("http://localhost:8000/users");
    if (response.ok) {
        return response.json();
    }
}

export async function isLoggedIn() {
    const userLogged = true;
    if(userLogged) {
        return {
            name:"Bob",
            age: 10
        }
    } else {
        return redirect("/");
    }
}