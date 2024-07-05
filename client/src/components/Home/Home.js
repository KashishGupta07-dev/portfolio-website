import React ,{useEffect,useState} from 'react'
import {AboutPage} from "../AboutPage";
import {HomePage} from "../HomePage";
import {ChatForm} from "../ChatForm";
import {NavBar} from "../NavBar";
import {Projects} from "../Projects";
import {Skills} from "../Skills";
import { Spinner } from '../Spinner';
import { useDispatch } from 'react-redux';
import { getAllProjectsApi } from '../../services/operations/project';
export const Home = () => {
  const [projects,setProjects] = useState(null);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getAllProjectsApi(setProjects, setLoading));
    // eslint-disable-next-line
  }, []);
  return (
   loading?<Spinner/> : <div className="overflow-hidden w-full min-h-screen">
            <NavBar />
            <HomePage/>
            <AboutPage />
            <div>
              <Projects projects={projects}/>
              <Skills />
            </div>
            <ChatForm />
          </div>
  )
}
