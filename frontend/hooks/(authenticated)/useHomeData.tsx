import { useEffect, useMemo } from "react";
import { useInventoryStore } from "@/utils/store/useInventoryStore";
import { apiQueue } from "@/utils/apiQueue";
import api from "@/services/api";
import { differenceInDays, parseISO } from "date-fns";

export const useHomeData = () => {
  const { items, setItems, isLoading } = useInventoryStore();

  useEffect(() => {
    const syncInventory = async () => {
      try {
        const response = await apiQueue.enqueue(
          async () => {
            return api.get("/inventory").then((res) => res.data);
          },
          { url: "/inventory", method: "GET", data: null }
        );

        console.log('response', response)
        const finalData = Array.isArray(response) ? response : response?.data;

        if (finalData && Array.isArray(finalData)) {
          setItems(finalData);
        }
      } catch (error) {
        console.error("Home Data Sync Error:", error);
      }
    };

    syncInventory();
  }, []);

  const sections = useMemo(() => {
    const today = new Date();

    // ERROR PREVENTER: Ensure safeItems is ALWAYS an array
    const safeItems = Array.isArray(items) ? items : [];

    const expiringSoon = safeItems.filter((item) => {
      if (!item || !item.expiry_date) return false;
      try {
        const daysLeft = differenceInDays(parseISO(item.expiry_date), today);
        return daysLeft >= 0 && daysLeft <= 3;
      } catch (e) {
        return false;
      }
    });

    return {
      allInventory: safeItems,
      expiringSoon: expiringSoon,
    };
  }, [items]);

  return {
    allInventory: sections.allInventory,
    expiringSoon: sections.expiringSoon,
    isLoading,
  };
};