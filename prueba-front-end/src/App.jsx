import { useEffect, useState } from 'react'
import { Login } from './components/login'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {

  const [isAuth , setIsAuth] = useState(false)
  const [redirectPath, setRedirectPath] = useState(false)
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if(redirectPath){
  //     navigate(redirectPath)
  //     setRedirectPath(false)
  //   }
  // }, [redirectPath])

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login auth={setIsAuth} setRedirect={setRedirectPath}/>} />
      <Route />
    </Routes>
    </>
  )
}

export default App