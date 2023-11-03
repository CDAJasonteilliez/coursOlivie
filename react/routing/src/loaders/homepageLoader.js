import { getArticles } from "../api/allRequest";

export async function articleLoader() {
    const articles = await getArticles();
    return articles;
}




