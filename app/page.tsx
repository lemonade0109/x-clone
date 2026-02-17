import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-8 lg:p-10">
        <div className="relative w-[clamp(260px,72vw,430px)] h-[clamp(260px,72vw,430px)] md:w-[clamp(320px,38vw,610px)] md:h-[clamp(320px,38vw,610px)]">
          <Image
            alt="x image"
            src="/image1.jpg"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 72vw, 38vw"
          />
        </div>
      </div>
      <div className="flex px-6 py-2 ">
        <h1 className="text-7xl font-extrabold ml-12">Happening now</h1>
      </div>
    </div>
  );
}
