import React from "react";
import { useGetListMoto } from "../../customHook/useGetListMoto";

export default function ListMotobike() {
  const [listMoto] = useGetListMoto();

  return (
    <>
      <h3>List Motobike</h3>
      <ul>
        {listMoto.map((moto) => (
          <li key={moto.id}>{moto?.name}</li>
        ))}
      </ul>
    </>
  );
}
