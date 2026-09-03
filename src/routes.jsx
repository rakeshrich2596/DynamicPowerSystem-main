import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router-dom";

import Home            from "./pages/Home/Home";
import About           from "./pages/About/About";
import Blog            from "./pages/Blog/Blog";
import BlogPost        from "./pages/BlogPost/BlogPost";
import Contact         from "./pages/Contact/Contact";
import Products        from "./pages/Products/Products";
import EastmanPage     from "./pages/Products/EastmanPage";
import AshaPage        from "./pages/Products/AshaPage";
import RacoldPage      from "./pages/Products/RacoldPage";
import HavellsPage     from "./pages/Products/HavellsPage";
import VGuardPage      from "./pages/Products/VGuardPage";
import BrandPage       from "./pages/Products/BrandPage";
import SolarCalculator from "./pages/SolarCalculator/SolarCalculator";

const Root = () => (
    <>
        <ScrollRestoration />
        <Outlet />
    </>
);

const router = createBrowserRouter([
    {
        element: <Root />,
        children: [
            { path: "/",                  element: <Home />            },
            { path: "/about",             element: <About />           },
            { path: "/blog",              element: <Blog />            },
            { path: "/blog/:slug",        element: <BlogPost />        },
            { path: "/contact",           element: <Contact />         },
            { path: "/products",          element: <Products />        },
            { path: "/products/eastman",  element: <EastmanPage />     },
            { path: "/products/ashapower",element: <AshaPage />        },
            { path: "/products/racold",   element: <RacoldPage />      },
            { path: "/products/havells",  element: <HavellsPage />     },
            { path: "/products/vguard",   element: <VGuardPage />      },
            { path: "/products/:brand",   element: <BrandPage />       },
            { path: "/solar-calculator",  element: <SolarCalculator /> },
        ],
    },
]);

export default router;
