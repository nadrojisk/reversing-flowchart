import React from "react";

// Material
import Typography from "@material-ui/core/Typography";

// Icons
import { Link } from "@material-ui/core";

export const SidebarHead = (props) => {
  return (
    <div>
      {/* TODO: put in link */}
      <Typography
        href="."
        gutterBottom
        variant="h5"
        component="h2"
        style={{ padding: "15px" }}
      >
        <Link href="." color="inherit" underline="none">
          Binary Hacking
        </Link>
      </Typography>
    </div>
  );
};
