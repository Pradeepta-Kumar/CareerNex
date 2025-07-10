import React from "react";
import { dashboardData } from "../../data/dashboardData";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IndustryInsights from "./IndustryInsights";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full py-6 md:pt-24 lg:py-26 bg-black text-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 tracking-tighter underline max-w-[600px] mx-auto flex justify-around items-center">
          <span>Explore</span> <span>Experience</span> <span>Enhance</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {dashboardData.map((feature, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between h-full min-h-[360px] bg-gray-950 hover:border-white hover:bg-black"
            >
              <CardContent className="flex-1 pt-6 px-4 flex flex-col items-center text-center">
                <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                  {feature.icon}
                  <h3 className="font-bold text-xl">{feature.title}</h3>
                  <p className="text-md font-light">{feature.description}</p>
                </div>
              </CardContent>
              <div className="px-4 pb-4 mt-auto">
                <Button
                  className="w-full bg-white text-black text-sm cursor-pointer"
                  onClick={() => navigate(feature.link)}
                >
                  Try now <PlusCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* overview */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-28">
        <IndustryInsights />
      </div>
    </section>
  );
};

export default Dashboard;
