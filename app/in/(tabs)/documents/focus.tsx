import FocusMode from "@/components/FocusMode";
import SharedHeader from "@/components/SharedHeader";
import Outside from "@/components/ui/Outside";
import React from "react";

const focus = () => {
  return (
    <Outside>
      <SharedHeader title="Focus Mode" />
      <FocusMode />
    </Outside>
  );
};

export default focus;
