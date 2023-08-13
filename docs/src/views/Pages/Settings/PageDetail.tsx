import { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import zoom0 from "../../../assets/map-zoom/zoom-0.png";
import zoom1 from "../../../assets/map-zoom/zoom-1.png";
import zoom2 from "../../../assets/map-zoom/zoom-2.png";
import zoom3 from "../../../assets/map-zoom/zoom-3.png";

import { usePreview } from "../../../utils/hooks/usePreview";

const detailPreview = [zoom0, zoom1, zoom2, zoom3];

const PageDetailCounter = () => {
  const [detail, setDetail] = useState<number>(0);

  const { setSrc } = usePreview();

  const onClick = useCallback(() => {
    setDetail((prev) => {
      const current = prev >= detailPreview.length - 1 ? 0 : prev + 1;
      setSrc(detailPreview[current]);

      return current;
    });
  }, [detail]);

  useEffect(() => {
    setSrc(detailPreview[detail]);
  }, []);

  return (
    <Box cursor="pointer" onClick={onClick} fontWeight={200 + detail * 200}>
      {detail}
    </Box>
  );
};

export default PageDetailCounter;
