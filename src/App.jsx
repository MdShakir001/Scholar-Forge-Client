import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Profile from "./Components/profile/Profile"
import SignIn from "./Components/auth/SignIn"
import SignUp from "./Components/auth/SignUp"
import Navbar from "./Components/common/Navbar"
import Home from "./Components/home/Home"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import { BrowserRouter as Router , Routes,Route  } from "react-router-dom"
import AuthProvider from "./Components/auth/AuthProvider"
import PrivateRout from "./Components/auth/PrivateRout"
import ArticleViewer from "./Components/journal/ArticleViewer"
import Footer from "./Components/common/Footer"
import Admin from "./Components/admin/Admin"
function App() {
  const user=localStorage.getItem("scholarId")
  return (
    <main>
      <Router>
      <AuthProvider>
      <Navbar/>
        <Routes>
         

        <Route path="*" element={<Home/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin/:activePage" element={<Admin/>}/>
        {!user &&
        <Route path="/sign-in" element={<SignIn/>}/>
        }
        {!user &&
        <Route path="/sign-up" element={<SignUp/>}/>
        }
        
        <Route element={<PrivateRout/>}>
        <Route path="/profile/:activePage" element={<Profile/>}/>
        <Route path='/view/article/:articleId' element={<ArticleViewer isClicked={true}/>}/>
        </Route>

        </Routes>
        </AuthProvider>
      </Router>
      
    </main>
  )
}

export default App
