import { useEffect, useState } from "react";
import { getMotobikes } from "../apis/getMotoBikes";

export function useGetListMoto(defaultValue = []) {
  const [listMoto, setListMoto] = useState([]);

  useEffect(() => {
    getMotobikes().then((res) => {
      setListMoto(res.data);
    });
  }, []);

  return [listMoto];
}
