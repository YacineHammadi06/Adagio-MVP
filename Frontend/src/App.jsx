import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import HotelDetailPage from "./pages/HotelDetailPage";
import BookingPage from "./pages/BookingPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/hotel/:id" element={<HotelDetailPage />} />
                <Route path="/booking/:id" element={<BookingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;