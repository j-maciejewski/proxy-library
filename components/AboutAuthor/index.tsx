import { sanitize } from "dompurify";
import { Paper, Typography } from "@mui/material";

import { CollapseWrapper } from "../CollapseWrapper";

export const AboutAuthor = ({
  authorDetails,
}: {
  authorDetails: APIAuthorDetails;
}) => {
  return (
    <Paper sx={{ p: 2, width: "100%" }}>
      <CollapseWrapper title="O autorze" defaultExtended={true}>
        <Typography
          variant="caption"
          color="lightgray"
          dangerouslySetInnerHTML={{
            __html: sanitize(authorDetails.description),
          }}
        ></Typography>
      </CollapseWrapper>
    </Paper>
  );
};
