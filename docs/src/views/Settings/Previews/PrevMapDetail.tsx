import { useCallback, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { usePreview } from "../../../utils/hooks/usePreview";

import zoom0 from "../../../assets/map-zoom/zoom-0.png";
import zoom1 from "../../../assets/map-zoom/zoom-1.png";
import zoom2 from "../../../assets/map-zoom/zoom-2.png";
import zoom3 from "../../../assets/map-zoom/zoom-3.png";
import { useStoreActions } from "../../../utils/store/global";

const detailPreview = [zoom0, zoom1, zoom2, zoom3];

const PrevMapDetail = () => {
  const [detail, setDetail] = useState<number>(0);
  const { setMapProps } = useStoreActions();

  const { setPreview, preview } = usePreview();

  const onClick = useCallback(() => {
    setDetail((prev) => {
      const current = prev >= detailPreview.length - 1 ? 0 : prev + 1;
      setPreview(detailPreview[current]);
      setMapProps({ currentZoom: current });
      return current;
    });
  }, [detail]);

  useEffect(() => {
    if (preview !== detailPreview[detail]) {
      setTimeout(() => {
        setPreview(detailPreview[detail]);
      }, 100);
    }
  }, [preview]);

  return (
    <Box cursor="pointer" onClick={onClick} fontWeight={200 + detail * 200}>
      {detail}
    </Box>
  );
};

export default PrevMapDetail;
