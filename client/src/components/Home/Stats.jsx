
import React from "react";

const Stats = () => {
  return (
    <section className="w-full py-6 md:py-12 bg-muted/50 flex justify-center items-center mx-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
          {/* Row 1 */}
          <div className="flex flex-col gap-8 md:gap-12 justify-center">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-gray-300 font-semibold">Industries Covered</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-gray-300 font-semibold">Interview Questions</p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-8 md:gap-12 justify-center">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-gray-300 font-semibold">Success Rate</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-gray-300 font-semibold">AI Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mr-70">
        <img
          src={"/Industry-stats.avif"}
          width={800}
          height={200}
          alt="CareerNex banner"
          className="rounded-lg shadow-2xl border mx-auto"
          priority
        />
      </div>
    </section>
  );
};

export default Stats;
