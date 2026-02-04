import { getProfileFromDb } from "@/services/profile/server";
import FooterLinkList from "./FooterLinkList";

export default async function Footer() {
  const profile = await getProfileFromDb();

  return (
    <footer className="w-full bg-black text-white py-20 px-10 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter break-all">
              {profile.email}
            </h2>
            <FooterLinkList profile={profile} />
          </div>
        </div>
      </div>
    </footer>
  );
}
