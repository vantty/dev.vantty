import React from "react";
import { MarkdownText } from "../../../components";
import terms from "./terms.md";

export default function index() {
  return (
    <div>
      <MarkdownText text={terms} title={"Terms of Service"} />
    </div>
  );
}
