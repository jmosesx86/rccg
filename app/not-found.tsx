import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy-radial pt-32 text-center">
      <div className="container-site">
        <p className="font-display text-[7rem] leading-none text-white/10 sm:text-[10rem]">404</p>
        <h1 className="heading-lg -mt-6 text-white">This page has wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">
          “I once was lost, but now am found.” Let&apos;s get you back on the right path.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary btn-lg">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-outline btn-lg">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
