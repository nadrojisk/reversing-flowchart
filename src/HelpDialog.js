import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Link,
} from "@material-ui/core";

export class HelpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };
    this.goTo = this.goTo.bind(this);
  }

  goTo(idx) {
    this.setState({ step: idx });
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        fullWidth
        maxWidth="sm"
        style={{ maxHeight: "90vh", height: "auto" }}
      >
        <DialogTitle>Help</DialogTitle>

        <div style={{ overflow: "scroll", width: "100%" }}>
          <DialogContent>
            <DialogContentText>
              Welcome to yaml-to-flowpoints!
              <br />
              Here you can generate beautiful flowcharts with YAML documents.
              <br />
              <br />
              You can also check out the{" "}
              <Link
                href="https://github.com/nadrojisk/yaml-to-flowpoints"
                target="_blank"
              >
                documentation
              </Link>{" "}
              for more information.
              <br />
              <br />
              Found an bug? Please open a new{" "}
              <Link
                href="https://github.com/nadrojisk/yaml-to-flowpoints/issues"
                target="_blank"
              >
                issue
              </Link>
              , and feel free to fix it!
            </DialogContentText>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}
