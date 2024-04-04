import { useState, useEffect, lazy, Suspense } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../config/axiosConfig.js";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import "./Home.css";
const LazyTableComponent = lazy(() =>
  import("../../components/TableComponent/TableComponent")
);
const LazyMobileComponent = lazy(() =>
  import("../../components/MobileComponent/MobileComponent")
);

/**
 * Component for rendering the home page.
 * @returns {JSX.Element} Home component.
 */
function Home() {
  const windowWidth = useWindowWidth();
  const { isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data from the server when the component mounts
  useEffect(() => {
    setError(""); // Clear any previous errors
    setIsLoading(true); // Set loading state

    axiosInstance
      .get("/inventory")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data); // Update data state with fetched data
        } else {
          setError("Invalid data format received from server"); // Set error state if data is not an array
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Server error"); // Set error state based on server response
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after fetching data
      });
  }, []);

  return (
    <div className="homeContainer">
      <Suspense fallback={<div className="loadingMessage">Loading...</div>}>
        {/* Display error message if there's an error */}
        {error ? (
          <div className="errorMessage">{error}</div>
        ) : isLoading ? ( // Display loading message if data is still loading
          <div className="loadingMessage">Loading data...</div>
        ) : (
          <>
            {/* Render TableComponent or MobileComponent based on window width */}
            {windowWidth > 900 ? (
              <LazyTableComponent
                data={data}
                setData={setData}
                isLoading={isLoading}
                error={error}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <LazyMobileComponent
                data={data}
                setData={setData}
                isLoading={isLoading}
                error={error}
                isLoggedIn={isLoggedIn}
              />
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}

export default Home;
