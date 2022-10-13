import "./styles.css";
import {  useGetMedicamentByIdQuery, useGetMedicamentsListQuery } from "./redux";

export default function App() {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyMUBlbWFpbC5jb20iLCJpYXQiOjE2NjU0MTQ2OTEsImV4cCI6MTY2NzQxNDY5MX0.NytIqCGO5SnIYCDKk6_bfISVGdBWe2Ps1hDPoIcekV_MNo9oiH623wLlx709C6bpFCNTEi5PIY-5a5_mNx-wQA";
  localStorage.setItem("token", token);
  const {data: MedicamentById , isLoading } = useGetMedicamentByIdQuery(24);
  const {data: MedicamentsList } = useGetMedicamentsListQuery();

  // if (isLoading) {
  //   return <h1>Loading</h1>;
  // }
  console.log("MedicamentById = ", " ", MedicamentById);
  console.log("MedicamentsList = ", " ", MedicamentsList);

  return (
    <div className="App">
      <h1>Ready!</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
