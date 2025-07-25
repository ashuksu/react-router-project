import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("pages/home.tsx"),
    route("about", "pages/history.tsx"),
    route("*", "pages/error.tsx")
] satisfies RouteConfig;