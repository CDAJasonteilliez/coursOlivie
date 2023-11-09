export async function getSeries() {
    try {
        const response = await fetch(
          "http://localhost:8000/api/series/getSeries"
        );
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            if (body) {
                throw body;
            } else {
                throw new Error("Error recuperation series");
            }
        }
    } catch (error) {
        console.error(error);
    }
}