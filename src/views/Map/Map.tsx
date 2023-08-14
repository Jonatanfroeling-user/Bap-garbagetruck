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
import { TransferRequest } from "./Modals/TransferRequest";

type ModalType = {
  name: string | null;
  data: any | null;
};

const Map = () => {
  const map = useMap();
  const { icon } = useAuth();
  const { setGlobalProps } = useStoreActions();
  const { type, center } = useStoreMap();

  const { isInactive } = useActivity(map);
  const mapTileUrl = useMemo(() => getMapType(type), [type]);

  const [openModal, setOpenModal] = useState<ModalType>({
    name: null,
    data: null,
  });

  // reset zoom on innactivity
  useEffect(() => {
    if (isInactive) {
      // recenterMap();
      map.setView(center);
      setGlobalProps({ hideHeader: true });
    } else {
      setGlobalProps({ hideHeader: false });
    }
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
    if (openModal.name) {
      switch (openModal.name) {
        case "promptSendRequest":
          return (
            <TransferRequest
              data={openModal.data}
              isOpen={true}
              onClose={onModalClose}
            />
          );

        case "promptRecieveRequest":
          return (
            <TransferRequest
              data={openModal.data}
              isOpen={true}
              onClose={onModalClose}
            />
          );

        case "sendTransferRequest":
          return (
            <TransferRequest
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
    map && iniMapFunctions(map, onModalOpen, icon as string);
  }, [Boolean(map)]);

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
