import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageEle = imageRef.current;

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPos > scrollThreshold) {
        imageEle?.classList.add("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-30 pb-10 md:pb-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
      <div className="mt-5 md:mt-0">
        <div ref={imageRef}>
          <img
            src="/Hero-Image.jpg"
            width={600}
            height={400}
            alt="CareerNex banner"
            className="rounded-lg shadow-2xl border mx-auto"
          />
        </div>
      </div>

      <div className="space-y-6 text-center md:text-left">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Your AI Career Coach for <br /> Professional Success
          </h1>
          <p className="font-semibold text-md text-gray-200">
            Advance your career with personalized guidance, <br />
            interview prep, and AI-powered tools for job success.
          </p>
        </div>

        <div className="flex justify-center md:justify-start space-x-4">
          <Link to="/dashboard">
            <Button className="px-8 bg-white text-black cursor-pointer" size="lg">
              Get Started
            </Button>
          </Link>
          <a
            href="https://github.com/Pradeepta-kumar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="px-8" size="lg" variant="outline">
              Contribute to the code
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
