

import React, { useState } from "react";
import partsList from "../../data/partsList.json";
import "./Sidebar.css"; // Make sure to import the CSS

const Sidebar = ({ hiddenParts, togglePart }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <h2 onClick={toggleSidebar}>
                {isCollapsed ? "Parts" : "Parts"}
            </h2>
            <ul>
                {partsList.map((part) => (
                    <li
                        key={part.id}
                        onClick={() => togglePart(part.id)}
                    >
                        <span>{part.name}</span>
                        <input
                            type="checkbox"
                            checked={!hiddenParts.includes(part.id)}
                            readOnly
                        />
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
