import react from 'react';

function Login() {
    return(
        <>
            <div className= 'loginContainer'>
            <form className='loginForm'>
                <input placeholder='USERNAME'></input>
                <input placeholder='EMAIL'></input>
                <input placeholder='PASSWORD'></input>
                <button className='loginSubmitBtn'>Login</button>
            </form>
            </div>
        </>
    )
}
export default Login