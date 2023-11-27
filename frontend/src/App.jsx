import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LayoutWithNav from './pages/Layout/LayoutWithNav';
import LayoutWithoutNav from './pages/Layout/LayoutWithoutNav';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SingUpPage/SignUpPage';
import { isLoggedIn } from './services/UserManagementServices/UserManagementService';

function App() {

  const router = createBrowserRouter([
    {
      element: <LayoutWithNav />,
      children: [
        {
          path: "/",
          element: isLoggedIn()? <LandingPage /> : <Navigate to="/user/sign-in"/>
        }
      ]
    },
    {
      element: <LayoutWithoutNav />,
      children: [
        {
          path: "/user/sign-in",
          element: <SignInPage />
        },
        {
          path: "/user/sign-up",
          element: <SignUpPage />
        }
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App