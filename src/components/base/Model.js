import React, { Component } from "react";

class MyModelViewer extends Component {
  componentDidMount() {
    if (!customElements.get("my-model-viewer")) {
      customElements.define(
        "my-model-viewer",
        customElements.get("model-viewer")
      );
      customElements.get("model-viewer").prototype.connectedCallback = null;
    }
  }

  render() {
    return <model-viewer {...this.props}></model-viewer>;
  }
}

export default MyModelViewer;
