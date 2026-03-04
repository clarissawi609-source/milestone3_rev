// Contoh SSG

import AboutPage, { AboutPageProps } from "@/components/aboutpage";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

// export const revalidate = 3600; // SSG with ISR: revalidate setiap 1 jam

async function getAboutData(): Promise<AboutPageProps> {
  // Example: fetch from API / CMS

  return {
    title: "About COBA1 store",
    description: "INI ADALAH COBA1STORE",
  };
}

export default async function Page() {
  const aboutData = await getAboutData();

  return (
    <main className="font-mono w-full">
      <Navbar />
      <section>
        <AboutPage {...aboutData} />
      </section>
      <Footer />
    </main>
  );
}