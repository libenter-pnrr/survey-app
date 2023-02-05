import Survey from "@pages/Survey";
import { SurveyProvider } from "@contexts/SurveyContext";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useApplicationContext } from "../../contexts/ApplicationProvider";
import CreateSurvey from "@pages/Survey/CreateSurvey";
import Dashboard from "@pages/Dashboard";
import UpdateSurvey from "@pages/Survey/UpdateSurvey";
import Project from "@pages/Project";
import SurveyDataDashboard from "@pages/Survey/SurveyDataDashboard";
import { ProjectProvider } from "@contexts/ProjectContext";

const Routing = () => {
  const { roles } = useApplicationContext();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {roles.includes("create-survey") && (
        <React.Fragment>
          <Route path="/wizard" element={<Survey />} />
          <Route
            path="/wizard/create"
            element={
              <SurveyProvider>
                <CreateSurvey />
              </SurveyProvider>
            }
          />
          <Route
            path="/wizard/:id/edit"
            element={
              <SurveyProvider>
                <UpdateSurvey />
              </SurveyProvider>
            }
          />
        </React.Fragment>
      )}
      {roles.includes("survey") && (
        <React.Fragment>
          <Route path="/survey" element={<SurveyDataDashboard />} />
        </React.Fragment>
      )}

      {roles.includes("project") && (
        <React.Fragment>
          <Route
            path="/projects"
            element={
              <ProjectProvider>
                <Project />
              </ProjectProvider>
            }
          />
        </React.Fragment>
      )}
    </Routes>
  );
};

export default Routing;
