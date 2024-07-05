import { projectApi } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
export const getAllProjectsApi = (setProjects, setLoading) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "GET",
        projectApi.GET_ALL_PROJECTS_API
      );
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        return;
      }
      setProjects(response?.data?.allProjects);
    } catch (error) {
      console.log("Error in getting all projects : ", error);
      toast.error(error?.response?.data?.message);
    } 
    toast.remove(toastId);
    setLoading(false);
  };
};

export const createProjectApi = (formData, setProjects, setLoading, token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "POST",
        projectApi.CREATE_PROJECT_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        return;
      }
      setProjects((prevProjects) => [
        ...prevProjects,
        response?.data?.createProject,
      ]);
    } catch (error) {
      console.log("Error in creating project: ", error);
      toast.error(error?.response?.data?.message);
    }
    toast.remove(toastId);
    setLoading(false);
  };
};

export const deleteProjectApi = (projectId, token, setProjects, setLoading) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "DELETE",
        projectApi.DELETE_PROJECT_API,
        {
          projectId,
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
        return;
      }
      setProjects((prevProjects) =>
        prevProjects?.filter((project) => project._id !== projectId)
      );
      toast.success("Project Deleted Successfully");
    } catch (error) {
      console.log("Error in deleting project  : ", error);
      toast.error(error?.response?.data?.message);
    }
    toast.remove(toastId);
    setLoading(false);
  };
};

export const editProjectApi = (
  formData,
  setProjects,
  setLoading,
  projectId,
  token
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        projectApi.EDIT_PROJECT_API,
          formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      const success = response?.data?.success;
      const message = response?.data?.message;
      if (!success) {
        toast.error(message);
        console.log(message);
        return;
      }
      setProjects((prevProjects) =>
        prevProjects?.map((project) =>
          project._id === projectId ? response?.data?.updatedProject : project
        )
      );
      toast.success("Project Updated Successfully");
    } catch (error) {
      console.log("Error in updating project: ", error);
      toast.error(error?.response?.data?.message);
    }
    toast.remove(toastId);
    setLoading(false);
  };
};
