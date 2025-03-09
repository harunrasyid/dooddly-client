import { Button, HStack, Input, Select } from "@chakra-ui/react";
import { styles } from "./toolbar.style.ts";
import { EToolOptions } from "./constants";
import { IToolbarProps } from "./toolbar.props.ts";

export const Toolbar = ({
  tools,
  onChangeTools,
  color,
  onChangeColor,
  onClearCanvas,
  onUndo,
  disableUndo,
  onRedo,
  disableRedo,
}: IToolbarProps) => {
  return (
    <HStack sx={styles.toolbarContainer}>
      <HStack sx={styles.toolbarLeft}>
        {/* Select Tools */}
        <Select
          placeholder="Select Tools"
          value={tools}
          onChange={(e) => onChangeTools?.(e.target.value as EToolOptions)}
        >
          <option value={EToolOptions.Pencil}>Pencil</option>
          <option value={EToolOptions.Line}>Line</option>
          <option value={EToolOptions.Rectangle}>Rectangle</option>
        </Select>

        {/* Select Color */}
        <Input
          type={"color"}
          placeholder={"Select Color"}
          value={color}
          onChange={(e) => {
            onChangeColor?.(e.target.value);
          }}
        />

        {/* Undo & Redo */}
        <HStack>
          <Button colorScheme={"blue"} disabled={disableUndo} onClick={onUndo}>
            Undo
          </Button>
          <Button disabled={disableRedo} onClick={onRedo}>
            Redo
          </Button>
        </HStack>
      </HStack>

      {/* Reset Button */}
      <HStack sx={styles.toolbarRight}>
        <Button onClick={onClearCanvas} colorScheme={"red"}>
          Clear Canvas
        </Button>
      </HStack>
    </HStack>
  );
};
