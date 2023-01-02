import Survey from "@pages/Survey";
import { SurveyProvider } from "@contexts/SurveyContext";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useApplicationContext } from "../../contexts/ApplicationProvider";

const Routing = () => {
  const { roles } = useApplicationContext();

  return (
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      {roles.includes("create-survey") && (
        <Route
          path="/create-survey"
          element={
            <SurveyProvider>
              <Survey />
            </SurveyProvider>
          }
        />
      )}
    </Routes>
  );
};

export default Routing;
