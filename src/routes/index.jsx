import { useRoutes } from "react-router-dom"
import { userLayoutRouter } from "./module/layout"
export const rootRouter = [...userLayoutRouter]
const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}
export default Router
