import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchInsights } from "@/store/industry-slice";
import { toast } from "sonner";

const ChartBlock = ({ title, data, color}) => (
  <Card className={`w-full shadow-md overflow-x-auto scrollbar-hide`}>
    <CardHeader>
      <CardTitle className="text-base md:text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-80 min-w-[375px]">
      {data && data.length > 0 ? (
        <ResponsiveContainer width="90%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="label" 
              interval={0} 
              angle={-25} 
              textAnchor="end" 
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </CardContent>
  </Card>
);


const IndustryInsights = () => {
  const {insights, isLoading} = useSelector(state => state.insights);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const userId = user?._id || user?.id;

  const insightsFetcher = async () => {
    dispatch(fetchInsights({id: userId})).then((data) => {
      if (data?.payload?.success) {
        toast.success("Insights fetched successfully!", {
          description: "Successfully fetched insights.",
        });
        setMessage("");
        dispatch(fetch_all_messages(user?.user?.id));
      } else {
        toast.error("Message failed!", {
          description: "Failed to fetch insights .",
        });
      }
    });
  };

  useEffect(() => {
    if(userId) insightsFetcher();
  
  }, [userId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-80 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  console.log({insights});

  if (!insights) return <p className="text-red-600">No insights found</p>;

  return (
    <div className="bg-white text-black rounded-2xl py-12">
      <h2 className="text-center font-bold text-4xl mb-6">Current Stats of Industries</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-12 bg-black w-[90%] text-white mx-auto rounded-2xl">
      <ChartBlock
        title="Industry Trends"
        data={insights.trends}
        color="#4f46e5"
      />
      <ChartBlock
        title="Challenges"
        data={insights.challenges}
        color="#dc2626"
      />
      <ChartBlock
        title="Opportunities"
        data={insights.opportunities}
        color="#22c55e"
      />
      <ChartBlock
        title="Future Outlook"
        data={insights.future}
        color="#f97316"
      />
      <ChartBlock
        title="Past Performance"
        data={insights.past}
        color="#0ea5e9"
      />
      <ChartBlock
        title="Average packages"
        data={insights.salary}
        color="#d946ef"
      />
    </div>
    </div>
  );
};

export default IndustryInsights;
