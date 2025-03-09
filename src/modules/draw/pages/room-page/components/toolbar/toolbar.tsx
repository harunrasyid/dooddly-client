import { Button, HStack, Input, Select } from "@chakra-ui/react";
import { styles } from "./toolbar.style.ts";
import { EToolOptions } from "./constants";
import { IToolbarProps } from "./toolbar.props.ts";

export const Toolbar = ({
  tools,
  onChangeTools,
  color,
  onChangeColor,
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
          <Button colorScheme={"blue"}>Undo</Button>
          <Button>Redo</Button>
        </HStack>
      </HStack>

      {/* Reset Button */}
      <HStack sx={styles.toolbarRight}>
        <Button colorScheme={"red"}>Clear Canvas</Button>
      </HStack>
    </HStack>
  );
};
