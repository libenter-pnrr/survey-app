import React, { useEffect, useState } from "react";
import { CardContent, Card } from "@mui/material";
import { Box, Container } from "@mui/system";

import { MainContainer } from "./SurveyBuilder.style";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

import useSurveyContext from "@contexts/SurveyContext";
import buildFormSchema from "@common/utils/buildFormSchema";

const SurveyPreview = () => {
  const [schema, setSchema] = useState<RJSFSchema>({});
  const [uiSchema, setUiSchema] = useState<UiSchema>({});
  const { questions, title, description } = useSurveyContext();

  useEffect(() => {
    const { schema, uiSchema } = buildFormSchema(title, description, questions);
    setSchema(schema);
    setUiSchema(uiSchema);
  }, []);

  return (
    <React.Fragment>
      <Box sx={MainContainer}>
        <Container maxWidth="md">
          <Card
            sx={{
              minHeight: "calc(100vh - 163px)",
            }}
          >
            <CardContent
              sx={{
                padding: 4,
              }}
            >
              <Form
                validator={validator}
                schema={schema}
                uiSchema={uiSchema}
                children={true}
              />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SurveyPreview;
