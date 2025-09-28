import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuttle" },
    { name: "description", content: "Play Cuttle" },
  ];
}

export default function Home() {
  return <>My app</>
}
