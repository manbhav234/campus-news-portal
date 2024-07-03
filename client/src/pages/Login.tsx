export default function Login(){
    return (
        <div className="flex items-center justify-center h-screen dark:bg-gray-800">
            <a className="google-btn" href='http://localhost:3000/auth/google'>
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span>Login with Google</span>
            </a>
        </div>
    )
}