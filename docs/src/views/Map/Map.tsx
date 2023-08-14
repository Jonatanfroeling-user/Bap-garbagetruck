import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TileLayer, useMap } from "react-leaflet";
import { MapUrlType, getMapUrl } from "./utils";
import {
  useAuth,
  useStoreActions,
  useStoreMap,
} from "../../utils/store/global";
import useActivity from "../../utils/hooks/useActivity";

import { iniMapFunctions } from "./Features";
import { TransferRequest } from "./Modals/TransferRequest";
import { useDisclosure } from "@chakra-ui/react";

const Map = () => {
  const [openModal, setOpenModal] = useState({
    name: "",
    data: {} as any,
  });
  const { icon } = useAuth();
  const { setGlobalProps } = useStoreActions();
  const { currentZoom, center, maxZoom, minZoom, type } = useStoreMap();
  const map = useMap();

  const mapType = useMemo(() => getMapUrl(type), [type]);

  const { isInactive } = useActivity(map);
  const [mapUrl, setMapUrl] = useState<MapUrlType>(mapType);

  const changeMapUrl = (url: string) => {
    setMapUrl(getMapUrl(url));
  };

  // reset zoom on innactivity
  useEffect(() => {
    if (isInactive) {
      // recenterMap();
      // map.setView(center);
      setGlobalProps({ hideHeader: true });
    } else {
      setGlobalProps({ hideHeader: false });
    }
  }, [isInactive]);

  // Modals logic
  const mapActionModal = useMemo(() => {
    switch (openModal.name) {
      case "promptSendRequest":
        return <TransferRequest data={openModal.data} isOpen={true} />;

      case "promptRecieveRequest":
        return <TransferRequest data={openModal.data} isOpen={true} />;

      case "sendTransferRequest":
        return <TransferRequest data={openModal.data} isOpen={true} />;
      default:
        return <></>;
    }
  }, [openModal]);

  const onModalOpen = useCallback((name: string, data: any) => {
    setOpenModal({
      name: name,
      data: data,
    });
  }, []);

  // init map functionsliaty
  useEffect(() => {
    map && iniMapFunctions(map, onModalOpen, icon as string);
  }, [Boolean(map)]);

  return (
    <>
      {mapActionModal}
      <TileLayer
        attribution={`Data by \u0026copy; \u003ca target="_blank" href="http://openstreetmap.org"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target="_blank" href="http://www.openstreetmap.org/copyright"\u003eODbL\u003c/a\u003e.`}
        url={mapUrl.url}
      />
    </>
  );
};

export default Map;
