import type { Route } from "./+types/index";
import { NavLink } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Cuttle" }, { name: "description", content: "Play Cuttle" }];
}

export default function Home() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Testy Mc Test Test
          </p>
          <NavLink to="/game" className="btn btn-primary">Start Game</NavLink>
        </div>
      </div>
    </div>
  );
}
