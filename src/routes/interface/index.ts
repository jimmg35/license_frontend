export interface RouteItem {
    path: string;
    component: React.ElementType
    routes?: Array<RouteItem>
    exact?: boolean
    protected: boolean
    level: number
}