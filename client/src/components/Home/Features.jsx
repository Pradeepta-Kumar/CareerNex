import React from "react";
import { features } from "../../../data/features";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

const Features = () => {
  return (
    <section className="w-full py-6 md:py-12 lg:py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight">
          Powerful Features you need for your <br />
          Career Growth
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-gray-950 hover:border-white hover:bg-black transition-colors duration-300 ease-in-out"
            >
              <CardContent className="pt-6 text-center flex flex-col items-center justify-center px-4">
                <div className="flex flex-col items-center justify-center space-y-3">
                  {feature.icon}
                  <h3 className="font-bold text-lg sm:text-xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-md font-light">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
