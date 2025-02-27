import {
  Route,
  RouterProvider, 
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Catalog from "./pages/Catalog";
import Navigation from "./pages/Navigation";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Error404Page from "./pages/Error404Page";
import ErrorPage from "./pages/ErrorPage";
import SingleCard from "./pages/SingleCard";
import Cart from "./pages/Cart";
import { postLoader } from "./pages/MainPage";
import { oneCardLoader } from "./pages/SingleCard";
import { getFormData } from "./components/OrderForm";
import "../css/MainPage.css";

const routerProv = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigation />}>
        <Route path="/" loader={postLoader} element={<MainPage />}></Route>
        <Route
          path="/catalog"
          loader={postLoader}
          element={<Catalog />}
        ></Route>
        <Route
          path="/catalog/:id"
          loader={oneCardLoader}
          element={<SingleCard />}
          errorElement={<ErrorPage />}
        ></Route>
        <Route path="*" element={<Error404Page />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route
          path="/cart"
          action={getFormData}
          element={<Cart />}
          errorElement={<ErrorPage />}
        ></Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={routerProv}></RouterProvider>;
}

export default App;
