import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  container: {
    height: "100vh",
    width: "100vw",
    alignItems: "center",
    justifyContent: "center",
    p: 8,
  },
  wrapper: {
    width: "100%",
    gap: 8,
  },
  box: {
    flex: 1,
    p: 6,
    borderWidth: 1,
    borderRadius: "lg",
    boxShadow: "md",
    w: "100%",
    align: "start",
  },
};

export { styles };
