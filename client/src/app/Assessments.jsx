import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { generate_questions } from "@/store/assessment-slice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const initialState = {
  skills: "",
  position: "",
};

const Assessments = () => {
  const [formData, setFormData] = useState(initialState);
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { questions } = useSelector((state) => state.assessments);
  const userId = user?._id || user.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    dispatch(generate_questions({ formData, id: userId }))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          toast.success("Assessment questions created", {
            description: "Successfully generated your assessment questions",
          });
        }
      })
      .catch((error) => {
        toast.error("Error creating Assessment Questions", {
          description: error.message || "Couldn't generate questions",
        });
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  return (
    <div className="w-full min-h-screen py-6 md:pt-24 lg:py-26 bg-black text-white">
      <div>
        <Button
        className="bg-white text-black ml-8 cursor-pointer hover:bg-gray-200"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftCircle className="mr-2" />
        <span>Go back</span>
      </Button>

      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center my-4 w-full">
        Enhance with CareerNex - Build your Career!
      </h2>
      </div>

      <form
          onSubmit={handleSubmit}
          className="space-y-4 py-6 px-8 w-full rounded-lg my-auto h-[75%] gap-5 text-white flex flex-col items-center"
        >
          <div className="flex flex-col justify-around items-center gap-4 w-[20%] mx-auto bg-gray-900 text-white rounded px-8 py-4">
            <div className="w-full">
              <Label className="text-white m-4 ">Skills</Label>
              <Input
                type="text"
                placeholder="Enter your skills here"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-white w-full">
              <Label className=" m-4">Position</Label>
              <Input
                type="text"
                placeholder="Enter your position here"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          <div className="my-4">
            <Button
              type="submit"
              className="bg-white text-black px-2 py-1 rounded-full flex  cursor-pointer"
            >
              Generate Questions <ArrowRightCircle />
            </Button>
          </div>
          </div>
        </form>

        <div className="px-4 py-6 w-full max-w-6xl mx-auto">
          <Card className="w-full bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Interview Questions for {formData.position}
              </CardTitle>
              <p className="text-center text-gray-400">
                Generated based on skills: {formData.skills}
              </p>
            </CardHeader>
            
            <Separator className="bg-gray-700" />
            
            <CardContent className="p-0">
              <ScrollArea className="h-[60vh] p-6">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown
                    components={{
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold mt-6 mb-4 text-blue-400" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-medium mt-5 mb-3 text-green-400" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-4 leading-relaxed" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-yellow-400" {...props} />
                      ),
                    }}
                  >
                    {questions}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className={"text-sm font-light flex items-center justify-center"}>Note: scroll down to view all questions</CardFooter>
          </Card>
        </div>

        
    </div>
  );
};

export default Assessments;