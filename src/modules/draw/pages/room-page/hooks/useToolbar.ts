import { useState } from "react";
import { EToolOptions } from "../components";

export function useToolbar() {
  const [tools, setTools] = useState<EToolOptions>(EToolOptions.Pencil);
  const [color, setColor] = useState<string>("#000000");

  // Tools
  const onChangeTools = (newTools: EToolOptions) => {
    setTools(newTools);
  };

  // Color
  const onChangeColor = (newColor: string) => {
    setColor(newColor);
  };

  return {
    tools,
    onChangeTools,
    color,
    onChangeColor,
  };
}
