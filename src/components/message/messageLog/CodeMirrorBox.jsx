import React, { Component } from "react";
import CodeMirror from "react-codemirror";

import "codemirror/mode/javascript/javascript";

// CSS
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

class CodeMirrorBox extends Component {
  render() {
    const options = {
      lineNumbers: true,
      theme: "default"
    };
    return (
      <CodeMirror
        value={`// code `}
        onChange={() => console.log("yes")}
        options={options}
      />
    );
  }
}

export default CodeMirrorBox;