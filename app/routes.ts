import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index('routes/home/index.tsx'),
  route('game', 'routes/game/index.tsx')
] satisfies RouteConfig;
