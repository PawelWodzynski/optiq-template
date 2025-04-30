import React from "react";
import styles from "./Dashboard.module.css"; // Use CSS Module
import { useDashboardLogic } from "./Dashboard";

// Import Section Components
import DashboardHeader from "./components/DashboardHeader";
import TailwindSection from "./components/TailwindSection";
import RechartsSection from "./components/RechartsSection";
import ReactIconsSection from "./components/ReactIconsSection";
import I18nextSection from "./components/I18nextSection";
import AxiosSection from "./components/AxiosSection";
import ApiAuthorizationSection from "./components/ApiAuthorizationSection";

const Dashboard = () => {
  const {
    libraryStatus,
    apiAuthStatus,
    chartData,
    testApiAuthorization,
  } = useDashboardLogic();

  // Optional: Add a loading state based on library checks if needed
  const isLoadingChecks = Object.values(libraryStatus).some(status => status === null);

  return (
    <div className={styles.pageContainer}> {/* Use styles */}
      <DashboardHeader />

      {/* Add a loading indicator while checks run */}
      {isLoadingChecks && (
        <div className={styles.loadingChecks}>Checking library status...</div>
      )}

      {/* Render sections once checks are done (or handle null state within sections) */}
      {!isLoadingChecks && (
        <main className={styles.mainContent}> {/* Use styles */}
          <TailwindSection libraryStatus={libraryStatus.tailwind} />
          <RechartsSection 
            libraryStatus={libraryStatus.recharts} 
            chartData={chartData} 
          />
          <ReactIconsSection libraryStatus={libraryStatus.reactIcons} />
          <I18nextSection libraryStatus={libraryStatus.i18next} />
          <AxiosSection libraryStatus={libraryStatus.axios} />
          <ApiAuthorizationSection 
            apiAuthStatus={apiAuthStatus} 
            onTestApi={testApiAuthorization} 
          />
        </main>
      )}
    </div>
  );
};

export default Dashboard;

