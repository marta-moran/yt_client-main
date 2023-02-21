import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/LoginPage/LoginPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import DashBoardPage from '../pages/DashBoardPage/DashBoard'
import SearchPage from '../pages/Search/SearchPage'
import VideosPage from '../pages/VideosPage/VideosPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import ChannelPage from '../pages/ChannelPage/ChannelPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/dashboard/:channel_id" element={<DashBoardPage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/search/:id" element={<ChannelPage />}></Route>


            <Route path="/videos/:videosSrc" element={<VideosPage />}></Route>
            <Route path="/my-profile" element={<ProfilePage />}></Route>
            <Route path="*" element={<h1>Error!!!</h1>}></Route>
        </Routes>
    )
}

export default AppRoutes