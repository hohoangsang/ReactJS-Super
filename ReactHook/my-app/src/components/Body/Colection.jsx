import React from "react";
import { useGetListMoto } from "../../customHook/useGetListMoto";

export default function Colection() {
  const [listMoto] = useGetListMoto();

  return (
    <>
      <h3>Colection</h3>
      <ul>
        {listMoto.map((moto) => (
          <li key={moto.id}>{moto?.name}</li>
        ))}
      </ul>
    </>
  );
}
