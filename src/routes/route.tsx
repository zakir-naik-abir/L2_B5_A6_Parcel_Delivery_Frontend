import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import HomePage from "@/pages/HomePage";
import { Register } from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: '/',
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: 'about'
      },
      {
        Component: Contact,
        path: 'contact'
      }
    ]
  },
  {
    Component: Register,
    path: '/register'
  },
  
]);