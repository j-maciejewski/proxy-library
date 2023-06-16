import { Link, Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { useBreadcrumbs } from "../../context/BreadcrumbsProvider";

export const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <MUIBreadcrumbs sx={{ mb: 2 }}>
      <Link underline="hover" color="inherit" href="/">
        <HomeIcon
          sx={{
            fill: breadcrumbs.length > 0 ? "rgba(255, 255, 255, .7)" : "white",
            transform: "translateY(3.5px)",
            height: 20,
          }}
        />
      </Link>
      {breadcrumbs.map((crumb, idx) => (
        <Link key={idx} underline="hover" color="inherit" href={crumb.href}>
          <span style={{ color: crumb.active ? "white" : "inherit" }}>
            {crumb.text}
          </span>
        </Link>
      ))}
    </MUIBreadcrumbs>
  );
};
