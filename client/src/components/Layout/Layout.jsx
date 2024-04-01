import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

/**
 * Layout component to render the main structure of the application.
 * @returns {JSX.Element} Layout component.
 */
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Toggles the sidebar open/closed.
   */
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Closes the sidebar.
   */
  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div style={{ marginBottom: "64px" }}>
      <Header onSidebarToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} handleClose={handleClose} />
    </div>
  );
}
