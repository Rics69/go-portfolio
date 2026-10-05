import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="container-page py-32">
      <h1 className="text-display text-[64px]">{profile.name}</h1>
      <p className="mt-4 text-xl text-muted">{profile.role}</p>
    </main>
  );
}
