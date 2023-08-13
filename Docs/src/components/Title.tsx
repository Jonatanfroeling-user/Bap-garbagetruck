import { Heading } from "@chakra-ui/react";
import { ItemSizeType } from "../types";
import { getItemSizeArray } from "../utils/helpers";

type TitleProps = {
  text: string | number;
  size?: ItemSizeType;
  upper?: boolean;
  color?: string;
};

const Title = ({
  text,
  size = 2,
  upper = false,
  color = "primary",
  ...other
}: TitleProps) => (
  <Heading
    color={color}
    textTransform={upper ? "uppercase" : undefined}
    size={getItemSizeArray(size)[2]}
    {...other}
  >
    {text}
  </Heading>
);

export default Title;
