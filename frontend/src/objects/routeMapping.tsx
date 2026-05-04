import type RouteProps from "../models/routeProps"
import EngagementBreakdown from "../routes/EngagementBreakdown"
import MostActiveUsers from '../routes/MostActiveUsers';
import Home from "../routes/Home";
import TopCountries from "../routes/TopCountries";
import TopHashtags from "../routes/TopHashtags";

/**
 * This file contains a RouteProp[] object which will be used to map to the 
 * React Router client in `App.tsx`
 */
export default [
    {
        path: "/engagement-breakdown",
        element: <EngagementBreakdown />
    },
    {
        path: "/most-active-users",
        element: <MostActiveUsers />
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/top-countries",
        element: <TopCountries />
    },
    {
        path: "/top-hashtags",
        element: <TopHashtags />
    }
] as RouteProps[]