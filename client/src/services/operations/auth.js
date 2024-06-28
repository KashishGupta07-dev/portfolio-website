import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authApi, profileApi } from "../apis";
import { setToken, setProfile } from "../../reducers/AuthSlice";
export const sendOtpApi = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", authApi.SEND_OTP_API, {
        email,
        password,
      });
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        navigate("/admin/login");
        return;
      }
      toast.success("Otp sent successfully");
      navigate("/admin/otp");
    } catch (error) {
      console.log("Error in sending otp : ", error);
      toast.error(error?.response?.data?.message);
      navigate("/admin/login");
    }
    toast.remove(toastId);
  };
};

export const loginApi = (email, otp, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", authApi.LOGIN_API, {
        email,
        otp,
      });
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        navigate("/admin/login");
        return;
      }
      dispatch(setToken(response?.data?.token));
      dispatch(setProfile(response?.data?.profileDetails));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      localStorage.setItem(
        "profile",
        JSON.stringify(response?.data?.profileDetails)
      );
      toast.success("Login Successful!!");
      navigate("/admin/dashboard/project-dashboard");
    } catch (error) {
      console.log("Error in login : ", error);
      toast.error(error?.response?.data?.message);
      navigate("/admin/login");
    }
    toast.remove(toastId);
  };
};

export const editProfileApi = (firstName, lastName, token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        profileApi.EDIT_PROFILE_API,
        {
          firstName,
          lastName,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        navigate("/admin/dashboard/project-dashboard");
        return;
      }
      dispatch(setProfile(response?.data?.updatedProfile));
      localStorage.setItem(
        "profile",
        JSON.stringify(response?.data?.updatedProfile)
      );
      toast.success("Profile Updated Successfully!!");
      navigate("/admin/dashboard/project-dashboard");
    } catch (error) {
      console.log("Error in updating profile : ", error);
      toast.error(error?.response?.data?.message);
      navigate("/admin/dashboard/project-dashboard");
    }
    toast.remove(toastId);
  };
};

export function logoutHandler( navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setToken(null));
      dispatch(setProfile(null));
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      navigate("/admin/login");
      toast.success("Logout Successful");
    } catch (error) {
        toast.error("Logout Unsuccessful");
        navigate("/admin/dashboard/project-dashboard") 
    }
    toast.remove(toastId);
  };
}
