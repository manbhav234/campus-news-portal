
import { RecoilRoot } from 'recoil'
import TopBar from './components/TopBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllArticles from './pages/AllArticles'
import General from './pages/General'
import Notices from './pages/Notices'
import Events from './pages/Events'
import Clubs from './pages/Clubs'


function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <TopBar/>
          <Routes>
            <Route path='/all' element={<AllArticles/>}/>
            <Route path='/general' element={<General/>}/>
            <Route path='/notices' element={<Notices/>}/>
            <Route path='/events' element={<Events/>}/>
            <Route path='/clubs' element={<Clubs/>}/>
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App