
import { RecoilRoot } from 'recoil'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllArticles from './pages/AllArticles'
import General from './pages/General'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Clubs from './pages/Clubs'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import CreateArticle from './pages/CreateArticle'
import CurrentArticle from './pages/CurrentArticle'
import MainPage from './pages/MainPage'


function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <TopBar/>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/all' element={<AllArticles/>}/>
            <Route path='/general' element={<General/>}/>
            <Route path='/notices' element={<Notices/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/clubs' element={<Clubs/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/dashboard/create-article' element={<CreateArticle/>}/>
            </Route>
            <Route path='/article/:articleId' element={<CurrentArticle/>}/>
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App