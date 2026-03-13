import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCart, setCart } from "./cartStorage.js";

export const CartContext = createContext(null);

function toMoney(n) {
  const x = Number(n);
  if (Number.isFinite(x)) return x;
  return 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getCart());

  useEffect(() => {
    setCart(items);
  }, [items]);

  const addItem = useCallback((product) => {
    if (!product || product.id == null) return;
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev;
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: toMoney(product.price),
          thumbnail: product.thumbnail,
          qty: 1,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const inc = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.min(99, Number(i.qty || 1) + 1) } : i,
      ),
    );
  }, []);

  const dec = useCallback((id) => {
    setItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id !== id) return [...acc, item];

        const newQty = item.qty - 1;
        if (newQty > 0) acc.push({ ...item, qty: newQty });

        return acc;
      }, []),
    );
  }, []);

  const setQty = useCallback((id, qty) => {
    const q = Math.max(1, Math.min(99, Number(qty || 1)));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: q } : i)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + Number(i.qty || 0), 0),
    [items],
  );
  const total = useMemo(
    () =>
      items.reduce((sum, i) => sum + toMoney(i.price) * Number(i.qty || 0), 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      total,
      addItem,
      removeItem,
      inc,
      dec,
      setQty,
      clear,
    }),
    [items, count, total, addItem, removeItem, inc, dec, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
