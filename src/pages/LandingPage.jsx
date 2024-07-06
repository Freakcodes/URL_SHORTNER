import React,{useState} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  const navigate=useNavigate();
  const [url,setUrl]=useState();
  const handleShortenClick=(e)=>{
      e.preventDefault();
      if(url)navigate(`/auth?createNew=${url}`);
  }
  return (
    <div className="flex flex-col justify-around h-screen">
      <div className="flex flex-col items-center">
        <h1 className=" my-10 sm:my-16 text-4xl font-extrabold sm:text-6xl font-sans  text-white text-center ">
          Simplify your links, amplify your reach
        </h1>
        <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 " onClick={handleShortenClick}>
          <Input
            type="url"
            value={url}
            placeholder="Enter your url"
            className="placeholder:text-[16px]"
            onChange={(e)=>{setUrl(e.target.value)}}
          />
          <Button>Shorten</Button>
        </form>
      </div>
      <div className="">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>How does this work?</AccordionTrigger>
            <AccordionContent>
             When you enter a long URL,our system generates a shorter version of that URL. this shortend URL redirects to the original long URL when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do I need an account to use the app?</AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account help you manage your URLs,view analytics,and customize your short urls.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
