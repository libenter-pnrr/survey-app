import Survey from "@pages/Survey";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useApplicationContext } from "../../contexts/ApplicationProvider";

const Routing = () => {
  const { roles } = useApplicationContext();

  return (
    <Routes>
      <Route path="/" element={<div>Dashboard</div>} />
      {roles.includes("create-survey") && (
        <Route path="/create-survey" element={<Survey />} />
      )}
    </Routes>
  );
};

export default Routing;
