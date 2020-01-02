import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./index";

test("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Home></Home>, div);
});
