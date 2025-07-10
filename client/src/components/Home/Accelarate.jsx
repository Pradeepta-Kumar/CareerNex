import { Link } from "react-router-dom";
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const Accelarate = () => {
  const {user} = useSelector(state => state.auth);
  console.log({user});
  return (
    <section className="w-full bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto rounded-lg gradient p-8 sm:p-12 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground">
            Ready to Accelerate Your Career?
          </h2>
          <p className="max-w-xl text-primary-foreground/80 md:text-lg font-normal">
            Join thousands of professionals who are advancing their careers with
            AI-powered guidance.
          </p>
          <Link href="/dashboard" passHref>
            <a>
              <Button
                size="lg"
                variant="secondary"
                className="mt-6 h-12 px-6 bg-black text-white rounded-md shadow-lg hover:bg-gray-900 transition animate-bounce flex items-center justify-center gap-2"
              >
                Start Your Journey Today <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Accelarate;
