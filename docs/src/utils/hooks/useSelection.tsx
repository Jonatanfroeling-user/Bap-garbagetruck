import { useState, useCallback, useMemo, useEffect } from "react";
import { ListItemType } from "../../types";

function useSelection(items: ListItemType[]) {
  const [selected, setSelected] = useState<string>(items[0].id);

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
    (itemId: string) => () => setSelected(itemId),
    []
  );

  return { selected: selected, onSelect: onSelect as any };
}

export default useSelection;
