import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CarouselCat from "@/components/CarouselCat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg md:max-w-xl lg:max-w-4xl m-auto items-center">
        <section>
          <div className="justify-center items-center h-100 flex flex-col w-full border-b ">
            <h1 className="text-center  text-3xl/14 md:text-4xl/14 lg:text-5xl/21 w-full lg:w-3xl font-bold my-10 px-10 ">
              COBA1 STORE
            </h1>
          </div>
        </section>
        <section>
          <CarouselCat />
        </section>
      </main>
      <Footer />
    </>
  );
}