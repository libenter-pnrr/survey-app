import Survey from "@pages/Survey";
import { SurveyProvider } from "@contexts/SurveyContext";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useApplicationContext } from "../../contexts/ApplicationProvider";
import CreateSurvey from "@pages/Survey/CreateSurvey";
import Dashboard from "@pages/Dashboard";
import UpdateSurvey from "@pages/Survey/UpdateSurvey";

const Routing = () => {
  const { roles } = useApplicationContext();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {roles.includes("create-survey") && (
        <React.Fragment>
          <Route path="/survey" element={<Survey />} />
          <Route
            path="/survey/create"
            element={
              <SurveyProvider>
                <CreateSurvey />
              </SurveyProvider>
            }
          />
          <Route
            path="/survey/:id/edit"
            element={
              <SurveyProvider>
                <UpdateSurvey />
              </SurveyProvider>
            }
          />
        </React.Fragment>
      )}
    </Routes>
  );
};

export default Routing;
