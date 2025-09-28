import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cuttle" },
    { name: "description", content: "Play Cuttle" },
  ];
}

export default function Home() {
  return <>My app</>
}
