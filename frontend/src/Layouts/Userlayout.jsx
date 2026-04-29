import { Outlet } from "react-router-dom";

export default function Userlayout() {
  return (
   <>
        <div className="layout">
            <main className="main-content"> 
                <Outlet/>
            </main>
        </div>
   </>
  )
}
