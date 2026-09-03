import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/DashBoard";
import ManageMenu from "./pages/menu/ManageMenu";
import Menu from "./pages/menu/Menu";
import BookingList from "./pages/booking/Booking";
import Reviews from "./pages/reviews/Reviews";
import Offers from "./pages/offers/Offers";
import Gallery from "./pages/gallery/Gallery";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

import ManageBooking from "./pages/booking/ManageBooking";

import ManageReviews from "./pages/reviews/ManageReviews";

import ProtectedRoute from "./routes/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />

          <Route
            path="/menu/manage"
            element={
            <ProtectedRoute>
              <ManageMenu />
            </ProtectedRoute>
            }
          />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingList />
            </ProtectedRoute>
          }
        />

       

          <Route
            path="/bookings/manage"
            element={
              <ProtectedRoute>
                <ManageBooking />
              </ProtectedRoute>
            }
          />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews/manage"
          element={
            <ProtectedRoute>
              <ManageReviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;