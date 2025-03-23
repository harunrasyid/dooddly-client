import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  container: {
    height: "100vh",
    width: "100vw",
    alignItems: "flex-start",
    justifyContent: "space-between",
    p: 8,
  },

  canvas: {
    width: "100%",
    height: "80%",
    border: "solid 1px #000000",
    borderRadius: "8px",
    overflow: "hidden",
  },
};

export { styles };
