import type { Route } from "./+types/index";

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
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
