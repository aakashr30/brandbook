// import React, { useState } from "react";
// import { Home, Info, Settings, Wrench } from "lucide-react";

// const Navbar = () => {
//     const [activeItem, setActiveItem] = useState("home");

//     const navItems = [
//         { id: "home", label: "Home", icon: Home },
//         { id: "about", label: "About Us", icon: Info },
//         { id: "configuration", label: "Configuration", icon: Settings },
//         { id: "maintenance", label: "Maintenance", icon: Wrench }
//     ];

//     return (
//         <nav className="relative bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Logo/Brand */}
//                     <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
//                             <span className="text-black font-bold text-lg">C</span>
//                         </div>
//                         <div className="text-white">
//                             <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
//                                 CAT 150 Grader
//                             </h1>
//                             <p className="text-xs text-gray-400 -mt-1">Configurator</p>
//                         </div>
//                     </div>

//                     {/* Navigation Items */}
//                     <div className="hidden md:block">
//                         <div className="ml-10 flex items-baseline space-x-1">
//                             {navItems.map((item) => {
//                                 const IconComponent = item.icon;
//                                 const isActive = activeItem === item.id;

//                                 return (
//                                     <button
//                                         key={item.id}
//                                         onClick={() => setActiveItem(item.id)}
//                                         className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${isActive
//                                                 ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 shadow-lg"
//                                                 : "text-gray-300 hover:text-white hover:bg-white/5"
//                                             }`}
//                                     >
//                                         <div className="flex items-center space-x-2">
//                                             <IconComponent
//                                                 size={16}
//                                                 className={`transition-colors duration-300 ${isActive ? "text-yellow-400" : "group-hover:text-white"
//                                                     }`}
//                                             />
//                                             <span>{item.label}</span>
//                                         </div>

//                                         {/* Active indicator */}
//                                         {isActive && (
//                                             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
//                                         )}

//                                         {/* Hover glow effect */}
//                                         <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? "opacity-20" : ""}`} />
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>

//                     {/* Mobile menu button */}
//                     <div className="md:hidden">
//                         <button className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors duration-200">
//                             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Subtle animated background */}
//             <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-transparent to-orange-500/5 opacity-50" />

//             {/* Moving light effect */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//                 <div
//                     className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12"
//                     style={{
//                         animation: "shimmer 3s ease-in-out infinite"
//                     }}
//                 />
//             </div>

//             <style>{`
//                 @keyframes shimmer {
//                     0% { transform: translateX(-100%) skewX(12deg); }
//                     100% { transform: translateX(200vw) skewX(12deg); }
//                 }
//             `}</style>
//         </nav>
//     );
// };

// export default Navbar;

import React, { useState } from "react";
import { Home, Info, Settings, Wrench } from "lucide-react";
import "./Navbar.css";
// import tridumvistalogo from "../../../public/images/tridumvistalogo";

const Navbar = () => {
    const [activeItem, setActiveItem] = useState("home");

    const navItems = [
        { id: "home", label: "Home", icon: Home },
        { id: "about", label: "About Us", icon: Info },
        { id: "configuration", label: "Configuration", icon: Settings },
        { id: "maintenance", label: "Maintenance", icon: Wrench }
    ];

    return (
        <nav className="modern-navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Logo/Brand */}
                    <div className="navbar-brand">
                        <div className="brand-logo">
                            <img src="/images/tridumvistalogo.png" alt="Logo" className="logo-image" />                        </div>

                        {/* <div className="brand-info">
                            <h1 className="brand-title">CAT 150 Grader</h1>
                            <p className="brand-subtitle">Configurator</p>
                        </div> */}
                    </div>

                    {/* Navigation Items */}
                    <div className="nav-items-container">
                        <div className="nav-items">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = activeItem === item.id;

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveItem(item.id)}
                                        className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                                    >
                                        <div className="nav-item-content">
                                            <IconComponent size={16} className="nav-icon" />
                                            <span className="nav-label">{item.label}</span>
                                        </div>

                                        {/* Active indicator */}
                                        {isActive && <div className="active-indicator" />}

                                        {/* Hover glow effect */}
                                        <div className="hover-glow" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="mobile-menu">
                        <button className="mobile-menu-btn">
                            <svg className="mobile-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated backgrounds */}
            <div className="navbar-bg-gradient" />
            <div className="navbar-shimmer">
                <div className="shimmer-effect" />
            </div>
        </nav>
    );
};

export default Navbar;