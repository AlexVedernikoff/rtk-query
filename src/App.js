import "./styles.css";
import {  useGetMedicamentByIdQuery, 
  useGetMedicamentsListQuery, 
  useCreateMedicamentMutation } from "./redux";
import { useState } from "react";

export default function App() {
  const [isFirstRender, SetIsFirstRender] = useState(true)
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyMUBlbWFpbC5jb20iLCJpYXQiOjE2NjU0MTQ2OTEsImV4cCI6MTY2NzQxNDY5MX0.NytIqCGO5SnIYCDKk6_bfISVGdBWe2Ps1hDPoIcekV_MNo9oiH623wLlx709C6bpFCNTEi5PIY-5a5_mNx-wQA";
  localStorage.setItem("token", token);
  const {data: medicamentById , isLoading } = useGetMedicamentByIdQuery(24);
  const {data: medicamentsList } = useGetMedicamentsListQuery();
  const [createMedicament] = useCreateMedicamentMutation();
  const bodyRequest = 
    {
      "manufactureName": "MosKhimProm",
      "name": "Aspirin_12",
      "iconUrl": "icon1",
      "description": "ot vsego"
    }

  const handleCreateMedicament = async () => {
    if (isFirstRender) {
      SetIsFirstRender(false)
      await createMedicament(bodyRequest)
    }
    
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  
  handleCreateMedicament();
  console.log("MedicamentById = ", " ", medicamentById);
  console.log("MedicamentsList = ", " ", medicamentsList);

  return (
    <div className="App">
      <h1>Ready!</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
