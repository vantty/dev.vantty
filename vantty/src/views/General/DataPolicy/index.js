import React from "react";
import { MarkdownText } from "../../../components";
import policy from "./policy.md";

export default function index() {
  return (
    <div>
      <MarkdownText text={policy} title={"Data Policy"} />
    </div>
  );
}
