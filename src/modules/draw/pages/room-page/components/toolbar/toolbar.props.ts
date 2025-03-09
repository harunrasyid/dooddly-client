import { EToolOptions } from "./constants";

export interface IToolbarProps {
  tools: EToolOptions;
  onChangeTools?: (tools: EToolOptions) => void;
  color: string;
  onChangeColor?: (color: string) => void;
  onClearCanvas?: () => void;
  onUndo?: () => void;
  disableUndo?: boolean;
  onRedo?: () => void;
  disableRedo?: boolean;
}
