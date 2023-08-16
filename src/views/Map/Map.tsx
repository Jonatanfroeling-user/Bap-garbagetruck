import { useCallback, useEffect, useMemo, useState } from "react";
import { TileLayer, useMap } from "react-leaflet";
import { getMapType } from "./utils";
import {
  useAuth,
  useStoreActions,
  useStoreMap,
} from "../../utils/store/global";
import useActivity from "../../utils/hooks/useActivity";

import { iniMapFunctions } from "./Features";
import { OpenTransferRequest } from "./Modals/OpenTransferRequest";
import { RecieveTransferRequest } from "./Modals/RecieveTransferRequest";

type ModalType = {
  name: string | null;
  data: any | null;
};

const Map = () => {
  const map = useMap();
  const { user } = useAuth();

  const { setGlobalProps } = useStoreActions();
  const { type, currentZoom } = useStoreMap();

  const { isInactive } = useActivity(map);
  const mapTileUrl = useMemo(() => getMapType(type), [type]);

  const [openModal, setOpenModal] = useState<ModalType>({
    name: null,
    data: null,
  });
  const recenterMap = useCallback(() => {
    const position = window._users?.currentUser?.position;

    if (position && position[0]) {
      const smoothCoords = position.map((i) => +i.toFixed(3));
      const smoothCurrent = Object.values(map.getCenter()).map(
        (i) => +i.toFixed(3)
      );

      if (String(smoothCoords) !== String(smoothCurrent)) {
        // setMapProps({ center: position });
        map.flyTo(smoothCoords as any, currentZoom, {
          // is triggerd about every 5 sec
          duration: 5,
          easeLinearity: 0.9,
        });
      }
    }
  }, [currentZoom]);

  // reset zoom on innactivity
  useEffect(() => {
    // @ts-ignore
    let interval = null;
    if (isInactive) {
      interval = setInterval(() => {
        recenterMap();
      }, 1000);
      setGlobalProps({ hideHeader: true });
    } else {
      setGlobalProps({ hideHeader: false });
    }
    return () => {
      // @ts-ignore
      clearInterval(interval);
    };
  }, [isInactive]);

  // Modals logic
  const onModalOpen = useCallback((name: string, data: any) => {
    setOpenModal({
      name: name,
      data: data,
    });
  }, []);

  const onModalClose = useCallback(() => {
    setOpenModal({
      name: null,
      data: null,
    });
  }, []);

  const mapActionModal = useMemo(() => {
    if (openModal.name && openModal.data) {
      switch (openModal.name) {
        case "promptSendRequest":
          return (
            <OpenTransferRequest
              data={openModal.data}
              isOpen={true}
              onClose={onModalClose}
            />
          );

        case "promptRecieveRequest":
          return (
            <RecieveTransferRequest
              data={openModal.data}
              isOpen={true}
              onClose={onModalClose}
            />
          );

        case "---sendTransferRequest":
          return (
            <OpenTransferRequest
              data={openModal.data}
              isOpen={true}
              onClose={onModalClose}
            />
          );
        default:
          return <></>;
      }
    }
  }, [openModal]);

  // init map functionsliaty
  useEffect(() => {
    if (user && !window._users?.currentUser) {
      map && iniMapFunctions(map, onModalOpen, user);
      setTimeout(() => {
        recenterMap();
      }, 200);
    }
  }, [Boolean(map), Boolean(user)]);

  return (
    <>
      {mapActionModal}
      <TileLayer
        attribution={`Data by \u0026copy; \u003ca target="_blank" href="http://openstreetmap.org"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca target="_blank" href="http://www.openstreetmap.org/copyright"\u003eODbL\u003c/a\u003e.`}
        url={mapTileUrl}
      />
    </>
  );
};

export default Map;
