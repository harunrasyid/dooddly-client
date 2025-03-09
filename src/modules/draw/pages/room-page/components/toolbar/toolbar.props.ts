import { EToolOptions } from "./constants";

export interface IToolbarProps {
  tools: EToolOptions;
  onChangeTools?: (tools: EToolOptions) => void;
  color: string;
  onChangeColor?: (color: string) => void;
}
