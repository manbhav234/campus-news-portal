import ReactQuill from "react-quill";
import { useForm, SubmitHandler } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserAtom } from "../store/atoms/user";
import { currentUserArticlesAtom } from "../store/atoms/currentUserArticles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


type Inputs = {
    title: string,
    category: string,
    articleImage: string,
    content: string
  };

export default function CreateArticle(){

    const { register, handleSubmit,watch, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const currentUser = useRecoilValue(currentUserAtom)
    const [currentUserArticles, setCurrentUserArticles] = useRecoilState(currentUserArticlesAtom)
    const [formStatus, setFormStatus] = useState('archived')
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData()
        formData.append('file', data.articleImage[0])
        formData.append('title', data.title)
        formData.append('content', data.content)
        formData.append('category', data.category)
        formData.append('authorId', currentUser._id)
        formData.append('status', formStatus)
        const response = await axios.post('http://localhost:3000/api/articles/upload', formData)
        if (response.data.success){
            setCurrentUserArticles([...currentUserArticles, response.data.article])
            navigate('/dashboard')
        }
    };

    useEffect(() => {
        register("content", { required:{value:true, message:'This field is required'}});
      }, [register]);

    const onEditorStateChange = (editorState: string) => {
        setValue("content", editorState);
    };

    const handleSubmitType = (type: string) => {
        console.log('reached here')
        setFormStatus(type)
    }

    const editorContent = watch("content");

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create Article</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 md:flex-row justify-between">
                    <input type="text" placeholder="Title" className="border border-black p-3 rounded-xl text-lg focus:outline-none flex-1" {...register("title", {required:{value:true, message:'This field is required'}})}/>
                    <select className="p-3 focus:outline-none border border-black rounded-xl hover:bg-slate-50 hover:cursor-pointer" {...register('category', {required:{value:true, message:'This field is required'}})}>
                        <option value="uncategorized">Select Category</option>
                        <option value="general">General</option>
                        <option value="notice">Notice</option>
                        <option value="event">Event</option>
                        <option value="club">Clubs</option>
                    </select>
                </div>
                <div className="flex items-center justify-center border-2 border-dashed border-black">
                    <input type="file" accept=".png, .jpg, .jpeg" className="w-[95%] file:bg-black file:text-white file:border-none file:p-3 file:mr-4 file:hover:cursor-pointer border border-black rounded-xl font-medium text-center my-4" {...register('articleImage', {required:{value:true, message:'This field is required'}})}/>
                </div>
                <ReactQuill theme="snow" placeholder="Write your article here..." className="h-72 mb-12" value={editorContent} onChange={onEditorStateChange}/>
                <div className="flex justify-end">
                    <button disabled={isSubmitting} type="submit" className="text-white font-bold text-lg rounded-xl p-3 bg-sky-500 mx-2" onClick={()=> handleSubmitType('archived')}>Archive</button>
                    <button disabled={isSubmitting} type="submit" className="text-white font-bold text-lg rounded-xl p-3 bg-red-500 " onClick={()=> handleSubmitType('published')}>Publish</button>
                </div>
                {isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" viewBox="-600 0 1400 1400"><circle fill="#000000" stroke="#000000" stroke-width="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>}
            </form>
        </div>
    )
}