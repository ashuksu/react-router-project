import {index, route, type RouteConfig} from "@react-router/dev/routes";

export default [
    index("pages/home.tsx"),
    route("about", "pages/about.tsx"),
    route("*", "pages/not-found.tsx")
] satisfies RouteConfig;