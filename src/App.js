// import React, { useState } from "react";
// import Navbar from "./components/Navbar/Navbar.tsx";
// import Sidebar from "./components/Sidebar/SideBar.tsx";
// import ThreeDViewer from "./components/ThreeViewer/ThreeDViewer.tsx";

// const App = () => {
//   const [hiddenParts, setHiddenParts] = useState([]);

//   const togglePart = (partId) => {
//     setHiddenParts((prev) =>
//       prev.includes(partId)
//         ? prev.filter((id) => id !== partId)
//         : [...prev, partId]
//     );
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
//       <Navbar />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar hiddenParts={hiddenParts} togglePart={togglePart} />
//         <main className="flex-1 bg-gray-900 relative">
//           <ThreeDViewer hiddenParts={hiddenParts} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import Navbar from "./components/Navbar/Navbar.tsx";
// import Sidebar from "./components/Sidebar/SideBar.tsx";
// import ThreeDViewer from "./components/ThreeViewer/ThreeDViewer.tsx";
// import Footer from "./components/Footer/Footer.jsx";

// const App = () => {
//   const [hiddenParts, setHiddenParts] = useState([]);

//   const togglePart = (partId) => {
//     setHiddenParts((prev) =>
//       prev.includes(partId)
//         ? prev.filter((id) => id !== partId)
//         : [...prev, partId]
//     );
//   };

//   return (
//     <div>
//       <div className="app-container">
//         <Navbar />
//         <div className="content">
//           <Sidebar hiddenParts={hiddenParts} togglePart={togglePart} />
//           <main className="main-viewer">
//             <ThreeDViewer hiddenParts={hiddenParts} />
//           </main>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default App;

// import { Scrollbars } from "react-custom-scrollbars-2";

// const App = () => {
//   const [hiddenParts, setHiddenParts] = useState([]);

//   const togglePart = (partId) => {
//     setHiddenParts((prev) =>
//       prev.includes(partId)
//         ? prev.filter((id) => id !== partId)
//         : [...prev, partId]
//     );
//   };

//   return (
//     <div className="app-container">
//       <Navbar />
//       <div className="content">
//         <Sidebar hiddenParts={hiddenParts} togglePart={togglePart} />

//         <main className="main-viewer">
//           <div className="viewer-card-scrollable">
//             <div className="viewer-card-inner">
//               <ThreeDViewer hiddenParts={hiddenParts} />
//             </div>
//           </div>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };
import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Sidebar from "./components/Sidebar/SideBar.tsx";
import ThreeDViewer from "./components/ThreeViewer/ThreeDViewer.tsx";
import Footer from "./components/Footer/Footer.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const App = () => {
  const [hiddenParts, setHiddenParts] = useState([]);

  const togglePart = (partId) => {
    setHiddenParts((prev) =>
      prev.includes(partId)
        ? prev.filter((id) => id !== partId)
        : [...prev, partId]
    );
  };

  return (
    // <PerfectScrollbar style={{ maxHeight: "640px" }}>
    <>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Sidebar hiddenParts={hiddenParts} togglePart={togglePart} />
          <main className="main-viewer">
            <div className="viewer-card-scrollable">
              <div className="viewer-card-inner">
                <ThreeDViewer hiddenParts={hiddenParts} />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
      {/* <PerfectScrollbar style={{ maxHeight: "640px" }}>
        <Footer />
      </PerfectScrollbar> */}
    </>

    // </PerfectScrollbar>
  );
};

export default App;
