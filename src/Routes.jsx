import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectLandingPage from "pages/project-landing-page";
import ProcessDetailView from "pages/process-detail-view";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ProjectLandingPage />} />
          <Route path="/project-landing-page" element={<ProjectLandingPage />} />
          <Route path="/process/:id" element={<ProcessDetailView />} />
          <Route path="/process-detail-view" element={<ProcessDetailView />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;