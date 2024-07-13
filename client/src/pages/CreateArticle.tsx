import { useForm, SubmitHandler } from "react-hook-form";
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentUserAtom } from "../store/atoms/user";
import { currentUserArticlesAtom } from "../store/atoms/currentUserArticles";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { allArticlesAtom } from "../store/atoms/allArticles";


type Inputs = {
    title: string,
    category: string,
    articleImage: string,
    content: string
  };

export default function CreateArticle(){

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>();
    const currentUser = useRecoilValue(currentUserAtom)
    const [currentUserArticles, setCurrentUserArticles] = useRecoilState(currentUserArticlesAtom)
    const [formStatus, setFormStatus] = useState('archived')
    const [displayArticles,setDisplayArticles] = useRecoilState(allArticlesAtom)
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData()
        formData.append('file', data.articleImage[0])
        formData.append('title', data.title)
        formData.append('content', data.content)
        formData.append('category', data.category)
        formData.append('authorName', currentUser.username)
        formData.append('authorId', currentUser._id)
        formData.append('status', formStatus)
        const response = await axios.post('/api/articles/upload', formData, {withCredentials: true})
        if (response.data.success){
            setCurrentUserArticles([...currentUserArticles, response.data.article])
            setDisplayArticles([...displayArticles, response.data.article])
            navigate('/dashboard')
        }
    };
    const editorRef = useRef<TinyMCEEditor | null>(null);

    useEffect(() => {
        register("content", { required:{value:true, message:'This field is required'}});
      }, [register]);

    const handleSubmitType = (type: string) => {
        console.log('reached here')
        setFormStatus(type)
    }

    const handleContentChange = (content : string) => {
        setValue('content', content)
    }

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Create Article</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 md:flex-row justify-between">
                    <input type="text" placeholder="Title" className="border border-black p-3 rounded-xl text-lg focus:outline-none flex-1" {...register("title", {required:{value:true, message:'This field is required'}})}/>
                    <select className="p-3 focus:outline-none border border-black rounded-xl hover:bg-slate-50 hover:cursor-pointer" {...register('category', {required:{value:true, message:'This field is required'}})}>
                        <option value="none">Select Category</option>
                        <option value="general">General</option>
                        <option value="notice">Notice</option>
                        <option value="event">Event</option>
                        <option value="club">Clubs</option>
                    </select>
                </div>
                <div className="flex items-center justify-center border-2 border-dashed border-black">
                    <input type="file" accept=".png, .jpg, .jpeg" className="w-[95%] file:bg-black file:text-white file:border-none file:p-3 file:mr-4 file:hover:cursor-pointer border border-black rounded-xl font-medium text-center my-4" {...register('articleImage', {required:{value:true, message:'This field is required'}})}/>
                </div>
                <Editor
                    apiKey="j2gra32zak1q78pz5hcxgkkla9twg1g77td6ckoe3w0wsj6w"
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleContentChange}
                />
                <div className="flex justify-end">
                    <button disabled={isSubmitting} type="submit" className="text-white font-bold text-lg rounded-xl p-3 bg-sky-500 mx-2" onClick={()=> handleSubmitType('archived')}>Archive</button>
                    <button disabled={isSubmitting} type="submit" className="text-white font-bold text-lg rounded-xl p-3 bg-red-500 " onClick={()=> handleSubmitType('published')}>Publish</button>
                </div>
                {isSubmitting && <svg xmlns="http://www.w3.org/2000/svg" viewBox="-600 0 1400 1400"><circle fill="#000000" stroke="#000000" strokeWidth="2" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="2" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="2" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>}
            </form>
        </div>
    )
}