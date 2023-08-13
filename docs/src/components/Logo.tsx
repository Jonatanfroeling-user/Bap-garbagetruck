import { memo } from "react";
import { Box } from "@chakra-ui/react";
import src from "../assets/logo.svg";

type LogoProps = {
  size?: number;
};

const Logo = ({ size = 10 }: LogoProps) => (
  <Box
    boxSize={`${size * 10}px`}
    backgroundImage={src}
    backgroundSize="contain"
    backgroundRepeat="no-repeat"
    backgroundPosition="center center"
    w="full"
  />
);

export default memo(Logo);
