import React, { useState } from "react";
import otpImg from "../../assets/user/enter-otp-concept-illustration.png";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { loginApi } from "../../services/operations/auth";
import { useNavigate } from "react-router-dom";
export const Otp = () => {
  const [otp, setOtp] = useState("");
  const {loginData} = useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function loginHandler(){
    dispatch(loginApi(loginData.email,otp,navigate));
  }
  return (
    <div className="h-screen overflow-hidden">
      <div className="w-4/5 mx-auto relative">
      <div className="absolute flex flex-col gap-y-7 items-center top-[38%] -translate-y-[35%] left-[50%] -translate-x-[41%]  z-[3]">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              type="text"
              placeholder="-"
              className="bg-[#617C83] placeholder:font-bold placeholder:font-dmsans font-bold placeholder:text-richblack-800 placeholder:text-xl placeholder:text-center  mr-[0.6rem] outline-none text-center text-lg placeholder-richblack-400  text-black rounded-md"
              style={{
                width: "42px",
                height: "57px",
                boxShadow: "rgba(255, 255, 255, 0.18) 0px -1px 0px inset",
              }}
            />
          )}
        />
        <button className="bg-[#FF735C] w-fit text-white px-9 py-2 shadow-[0px_0px_5px_0px] shadow-[#FF735C] font-dmsans font-bold rounded-3xl" onClick={loginHandler}>Continue</button>
      </div>
        <img src={otpImg} alt="OTP" className="object-cover"/>
      </div>
    </div>
  );
};
