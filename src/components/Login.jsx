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
import { login } from "../../db/apiAuth";
import {RingLoader} from "react-spinners"
import { useNavigate,useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
   console.log(password);
    await fnLogin();

  };
  

  const {
    data,
    error,
    loading,
    fn: fnLogin,
  } = useFetch(login, { email, password });
  let[searchParam]=useSearchParams();
  let navigate=useNavigate();
  const longlink=searchParam.get("createNew");
  const {fetchUser,isAuthenticated}=UrlState();
  useEffect(()=>{
    if(error===null && data){
      navigate(`/dashboard?${longlink?`createNew=${longlink}`:""}`)
      fetchUser();
    }
  },[data,error])
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>to your account</CardDescription>
            {error&&<Error message={error.message}/>}
          </CardHeader>

          <CardContent>
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
              {loading?<RingLoader size={20}/>:"Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
