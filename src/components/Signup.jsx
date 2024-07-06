import React, { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Error from "./Error";
import useFetch from "@/hooks/useFetch";
import {  signup } from "../../db/apiAuth";
import {RingLoader} from "react-spinners"
import { useNavigate,useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("");
  const onSubmit = async () => {
    await fnSignup();
  };
  

  const {
    data,
    error,
    loading,
    fn: fnSignup,
  } = useFetch(signup, { name,email,password });
  let[searchParam]=useSearchParams();
  let navigate=useNavigate();
  const longlink=searchParam.get("createNew");
  const {fetchUser}=UrlState();
  useEffect(()=>{
    if(error===null && data){
      navigate(`/dashboard?${longlink?`createNew=${longlink}`:""}`)
      fetchUser();
      console.log(data);
    }
  },[data,error])
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>Create your account</CardDescription>
            {error&&<Error message={error.message}/>}
          </CardHeader>

          <CardContent>
          <Input
              className="my-4 outline-none  "
              placeholder="Enter your Name"
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
               onChange={(e) => {
                console.log(e.target.value);
                 setName(e.target.value);
              }}
            />
            {errors.name && <Error message={errors.name.message} />}
           
           

            <Input
              className="my-4 outline-none  "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
               onChange={(e) => {
                 setEmail(e.target.value);
              }}
            />
            {errors.email && <Error message={errors.email.message} />}
            <Input
              
              className="my-4 outline-none"
              placeholder="Enter your Password"
              type="password"
              {...register("password1", {
                required:{
                  value:true,
                  
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
                
              })}
              onChange={(e) => {
                setPassword(e.target.value);
             }}
            />
            {errors.password1 && <Error message={errors.password1.message} />}
          </CardContent>
          <CardFooter>
            <Button>
              {loading?<RingLoader size={20}/>:"Create Account"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Signup;
