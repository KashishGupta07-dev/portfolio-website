import React, { useEffect } from "react";
import formImage from "../../assets/user/checklist-clipboard-pencil-icon-sign-symbol-reminder-checkbox-document-report-concept-pink-background-3d-rendering.png";
import { useForm } from "react-hook-form";
import { Upload } from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import { createProjectApi, editProjectApi } from "../../services/operations/project";
import { motion } from "framer-motion";
export const ProjectForm = ({
  title,
  setShowModal,
  setProjects,
  setLoading,
  showModal,
}) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (showModal?.projectData) {
      setValue("title", showModal?.projectData?.title);
      setValue("tag", showModal?.projectData?.tag);
      setValue("desc", showModal?.projectData?.desc);
      setValue("repository", showModal?.projectData?.repository);
      setValue("domain", showModal?.projectData?.domain);
    }
    // eslint-disable-next-line
  }, []);
  function isFormUpdated() {
    const allValues = getValues();
    if (
      allValues.title !== showModal?.projectData?.title ||
      allValues.tag !== showModal?.projectData?.tag ||
      allValues.desc !== showModal?.projectData?.desc ||
      allValues.repository !== showModal?.projectData?.repository ||
      allValues.domain !== showModal?.projectData?.domain ||
      allValues.image !== showModal?.projectData?.imgUrl
    ) {
      return true;
    }
    return false;
  }
  function submitHandler(data) {
    const formData = new FormData();
    formData.append("projectId",showModal?.projectData?._id);
    if(showModal?.projectData){
      if(isFormUpdated()){
        if(data.title !== showModal?.projectData?.title){
          formData.append("title",data.title);
        }
        if(data.tag !== showModal?.projectData?.tag){
          formData.append("tag",data.tag);
        }
        if(data.desc !== showModal?.projectData?.desc){
          formData.append("desc",data.desc);
        }
        if(data.repository !== showModal?.projectData?.repository){
          formData.append("repository",data.repository);
        }
        if(data.domain !== showModal?.projectData?.tag){
          formData.append("domain",data.domain);
        }
        if(data.image !== showModal?.projectData?.imgUrl){
          formData.append("image",data.image);
        }
        dispatch(editProjectApi(formData,setProjects,setLoading,showModal?.projectData?._id,token));
      }
      setShowModal(false);
      return;
    }

    formData.append("title", data.title);
    formData.append("tag", data.tag);
    formData.append("desc", data.desc);
    formData.append("image", data.image);
    formData.append("repository", data.repository);
    formData.append("domain", data.domain);
    dispatch(createProjectApi(formData, setProjects, setLoading, token));
    setShowModal(false);
    reset({
      title: "",
      tag: "",
      desc: "",
      repository: "",
      domain: "",
      image: null,
    });
  }
  return (
    <motion.div
      whileInView={{ scale: [1.5, 1] }}
      transition={{ duration: 0.6, easings: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      className="fixed w-full min-w-[100vw] min-h-screen left-0 overflow-y-scroll bottom-0 right-0 top-0 h-full bg-opacity-100 backdrop-blur-sm justify-center z-[100] bg-[#F8DADE]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="text-4xl sm:text-5xl font-bold font-dmsans text-center lg:w-full text-black mt-2">
        {title}
      </div>
      <div className="flex flex-col lg:flex-row-reverse justify-between">
        <form
          className=" w-[80%] lg;w-[45%] mx-auto mt-16 flex flex-col gap-y-4 items-center  font-vietnam"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex flex-col w-full">
            <select
              defaultValue={""}
              name="tag"
              className="bg-[#EDF2F8]  h-[40px] w-full rounded-lg px-4 py-2  outline-none"
              {...register("tag", {
                required: { value: true, message: "Please Enter Tag" },
              })}
            >
              <option value="" disabled>
                Please Choose Tag
              </option>
              <option>Mern</option>
              <option>Web</option>
              <option>React</option>
            </select>
            {errors.tag && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors.tag.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Please Enter Project Title...."
              name="title"
              className="bg-[#EDF2F8] placeholder:font-inter placeholder:font-normal h-[40px] w-full rounded-lg px-4 py-7 outline-none"
              {...register("title", {
                required: {
                  value: true,
                  message: "Please Enter Project Title",
                },
              })}
            />
            {errors.title && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Please Enter Short Description...."
              name="desc"
              className="bg-[#EDF2F8] h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none"
              {...register("desc", {
                required: {
                  value: true,
                  message: "Please Enter Short Description",
                },
              })}
            />
            {errors.desc && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors.desc.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Upload
              register={register}
              setValue={setValue}
              reset={reset}
              getValues={getValues}
              showModal={showModal}
            />
            {errors?.image && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors?.image.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="url"
              placeholder="Please Enter Respository Link...."
              name="repository"
              className="bg-[#EDF2F8] h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none"
              {...register("repository", {
                required: {
                  value: true,
                  message: "Please Enter Repository Link",
                },
              })}
            />
            {errors.repository && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors.repository.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <input
              type="url"
              placeholder="Please Enter Domain Link...."
              name="domain"
              className="bg-[#EDF2F8] h-[40px] placeholder:font-inter placeholder:font-normal w-full rounded-lg px-4 py-7 outline-none"
              {...register("domain", {
                required: { value: true, message: "Please Enter Domain Link" },
              })}
            />
            {errors.domain && (
              <span className="mt-1 font-vietnam text-[#313BAC] text-sm">
                {errors.domain.message}
              </span>
            )}
          </div>
          <div className="flex flex-row w-full my-5 justify-center gap-x-16">
            <button
              type="submit"
              className="bg-[#2430AF] w-fit py-3 px-6 hover:scale-90 shadow-[0px_0px_10px_0px] shadow-blue-100 transition-all duration-200 text-white font-dmsans font-bold rounded-lg"
            >
              {showModal?.projectData ? "Edit Project" : "Add Project"}
            </button>
            <button
              className=" bg-pink-200 w-fit py-3 px-6 hover:scale-90 shadow-[0px_0px_10px_0px] shadow-pink-200 transition-all duration-200 text-white font-dmsans font-bold rounded-lg"
              onClick={(event) => {
                event.preventDefault();
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <img
          src={formImage}
          alt="form"
          className=" hidden lg:block w-[45%] mb-20 object-cover"
        />
      </div>
    </motion.div>
  );
};
