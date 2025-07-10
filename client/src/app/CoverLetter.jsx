import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { create_cover_letter } from "@/store/cover-letter-slice";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";

const initialState = {
  fullname: "",
  email: "",
  phone: "",
  linkedInURL: "",
  githubURL: "",
  address: "",
  projects: "",
  skills: "",
  education: "",
  experience: "",
  certifications: "",
  acheivements: "",
  jobDescription: "",
  hobbies: "",
};

const CoverLetter = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { coverLetterContent } = useSelector((state) => state.coverLetter);

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

    dispatch(create_cover_letter({ formData, id: userId })).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cover Letter created", {
          description:
            "Successfully created your cover letter based on your details",
        });
      } else {
        toast.error("Error creating Cover-letter", {
          description: "Couldn't create cover letter using your details",
        });
      }
    });
  };

  console.log({ coverLetterContent });

  return (
    <div className="w-full py-6 md:pt-24 lg:py-26 bg-black text-white">
      <Button
        className={"bg-white text-black ml-8 cursor-pointer"}
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeftCircle /> <span>Go back</span>
      </Button>
      {/* inputs */}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-12 flex justify-around max-w-[600px] items-center mx-auto">
        Help CareerNex generate your Cover-Letter using your details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 py-6 px-8 w-full rounded-lg my-auto h-[75%] gap-5 text-white flex flex-col items-center"
      >
        <div className="flex justify-around items-center gap-20 w-[80%] mx-auto">
          <div className="w-full">
            <Label className="text-white m-4 ">Fullname</Label>
            <Input
              type="text"
              placeholder="Enter your fullname here"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <Label className="text-white m-4">Email I'd</Label>
            <Input
              type="email"
              placeholder="Enter your email here"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Phone no.</Label>
            <Input
              type="text"
              placeholder="Enter your Phone no. here"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">LinkedIn-URL</Label>
            <Input
              type="text"
              placeholder="Enter your LinkedIn-url here"
              name="linkedInURL"
              value={formData.linkedInURL}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Github-URL</Label>
            <Input
              type="text"
              placeholder="Enter your Phone no. here"
              name="githubURL"
              value={formData.githubURL}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Address</Label>
            <Input
              type="text"
              placeholder="Enter your address here"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Projects</Label>
            <Input
              type="text"
              placeholder="Enter your projects. here"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full">
            <Label className=" text-white m-4">Skills</Label>
            <Input
              type="text"
              placeholder="Enter your skills here"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Education</Label>
            <Input
              type="text"
              placeholder="Enter your colleges here"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            />
            <Label className=" text-white m-4">Experience</Label>
            <Input
              type="text"
              placeholder="Enter your experienme here. (if any)"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            <Label className=" text-white m-4">Certifications</Label>
            <Input
              type="text"
              placeholder="Enter your certifications here. (if any)"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
            />
            <Label className=" text-white m-4">Acheivements</Label>
            <Input
              type="text"
              placeholder="Enter your achievements here. (if any)"
              name="acheivements"
              value={formData.acheivements}
              onChange={handleChange}
            />
            <Label className=" text-white m-4">Job Description</Label>
            <Input
              type="text"
              placeholder="Enter your job description here."
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
            />
            <Label className=" text-white m-4">Hobbies</Label>
            <Input
              type="text"
              placeholder="Enter your hobbies here"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button
            type="submit"
            className="bg-white text-black px-2 py-1 rounded-full flex  cursor-pointer"
          >
            Generate Cover-Letter <ArrowRightCircle />
          </Button>
        </div>
      </form>
      {coverLetterContent ? (
        <div className=" py-6 bg-white text-black w-[80%] mx-auto rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 flex justify-around max-w-[600px] items-center mx-auto">
            Your Cover-Letter
          </h2>

          <Card className="w-[90%] mx-auto bg-muted/30 border border-muted-foreground/20 shadow-xl backdrop-blur-md text-white bg-black">
            <CardContent>
              <div className=" text-md leading-8 prose prose-invert max-w-none font-light text-justify">
                <ReactMarkdown>{coverLetterContent}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CoverLetter;
