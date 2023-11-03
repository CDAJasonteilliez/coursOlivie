import { Suspense } from "react";
import { NavLink, Outlet, useLoaderData, useOutletContext, useParams, useSearchParams } from "react-router-dom";

export default function Profile() {
  // const params = useParams();
  // console.log(params);
  // const [ queryParams, setQueryParams ] = useSearchParams();
  // console.log(queryParams);

  const user = useLoaderData();
  return (
    <div className="flex-fill">
      <ul className="d-flex p20">
        <li>
          <NavLink end to="" className={`mr10 tdn`}>
            <span>View</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="data" className={`mr10 tdn`}>
            <span>Data</span>
          </NavLink> 
        </li>
      </ul>
      <div className="p20">
        <Suspense >
          <Outlet />  
        </Suspense>
      </div>
    </div>
  )
   
}
