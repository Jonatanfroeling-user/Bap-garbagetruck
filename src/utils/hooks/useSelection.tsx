import { useState, useCallback, useMemo, useEffect } from "react";
import { ListItemType } from "../../types";
import { usePreview } from "./usePreview";
import { useNavigate } from "react-router-dom";

function useSelection(items: ListItemType[]) {
  const [selected, setSelected] = useState<string>("");
  const { setPreview } = usePreview();
  const navigate = useNavigate();

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  const handleUserKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const { key } = e;
      if (key === "ArrowDown") {
        const idx = ids.findIndex((id) => id === selected) + 1;
        setSelected(items[idx >= ids.length ? 0 : idx].id);
      } else if (key === "ArrowUp") {
        const idx = ids.findIndex((id) => id === selected) - 1;
        setSelected(items[idx < 0 ? ids.length - 1 : idx].id);
      } else if (key === "Enter") {
        (
          document.querySelector(
            `[data-key="clickable-${selected}"]`
          ) as HTMLElement
        )?.click();
      }
    },
    [ids, items, selected]
  );

  // listener
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const onSelect = useCallback(
    (itemId: string) => () => {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        setSelected(itemId);
        setPreview(item.preview);
        navigate(`?$id=${itemId}`);
      }
    },
    [items]
  );

  // init selected
  useEffect(() => {
    if (items && !selected) {
      onSelect(items[0].id)();
    }
  }, [Boolean(selected), items]);

  return { selected: selected, onSelect: onSelect as any };
}

export default useSelection;
