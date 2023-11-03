import { useLoaderData } from "react-router-dom"

export default function Homepage() {
  const articles = useLoaderData();

  return (
    <div className="flex-fill">
      <h1>Homepage</h1>
      <ul>
        {articles && articles.map((a,i) => (
          <li className="mb20" key={i}>
            {a.title}
          </li>
        ))}
      </ul>
    </div>

  )
}
