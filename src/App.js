import "./styles.css";
import {   useDeleteMedicamentByIdMutation, 
  useGetMedicamentByIdQuery, 
  useGetMedicamentsListQuery, 
  useCreateMedicamentMutation
  } from "./redux";
import { useState } from "react";

export default function App() {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [deleteId, setDeleteId] = useState("");
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyMUBlbWFpbC5jb20iLCJpYXQiOjE2NjU0MTQ2OTEsImV4cCI6MTY2NzQxNDY5MX0.NytIqCGO5SnIYCDKk6_bfISVGdBWe2Ps1hDPoIcekV_MNo9oiH623wLlx709C6bpFCNTEi5PIY-5a5_mNx-wQA";
  localStorage.setItem("token", token);
  const {data: medicamentById , isLoading } = useGetMedicamentByIdQuery(24);
  const {data: medicamentsList } = useGetMedicamentsListQuery();
  const [createMedicament] = useCreateMedicamentMutation();
  const [deleteMedicament, {error: deleteError}] = useDeleteMedicamentByIdMutation();
  const bodyRequest = 
    {
      "manufactureName": "MosKhimProm",
      "name": "Aspirin_16",
      "iconUrl": "icon1",
      "description": "ot vsego"
    }

  const handleCreateMedicament = async () => {
    if (isFirstRender) {
      setIsFirstRender(false)
      await createMedicament(bodyRequest)
    }
  }

  const handleDeleteMedicament = async () => {
      await deleteMedicament(deleteId)
  }

  if (isLoading) {
    return <h1>Loading</h1>; 
  }

 // handleCreateMedicament();
  console.log("MedicamentById = ", " ", medicamentById);
  console.log("MedicamentsList = ", " ", medicamentsList);
  console.log("Ошибка удаления! = ", deleteError)

  return (
    <div className="App">
      <div>
        <input 
          type="text"
          value = {deleteId}
          onChange = {(event)=>{setDeleteId(event.target.value)}}
        />
        <button onClick = {handleDeleteMedicament}>Удалить медикамент</button>
      </div>
    </div>
  );
}
