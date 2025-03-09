import { SystemStyleObject } from "@chakra-ui/react";

const styles: { [key: string]: SystemStyleObject } = {
  toolbarContainer: {
    display: "flex",
    width: "100%",
  },
  toolbarLeft: {
    display: "flex",
    width: "50%",
  },
  toolbarRight: {
    display: "flex",
    width: "50%",
    justifyContent: "flex-end",
  },
};

export { styles };
