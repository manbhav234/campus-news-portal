export default  function GoogleLoginBtn(){
    return (
        <div className="flex items-center justify-center m-6 dark:bg-gray-800 ">
            <a className="google-btn" href='/auth/google'>
            <div className="flex justify-center items-center">
                <img className="w-6 h-6 mx-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                <span className="mx-2">Login</span>
            </div>
            </a>
        </div>
    )
}