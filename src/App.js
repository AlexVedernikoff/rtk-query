import "./styles.css";
import {
  useDeleteMedicamentByIdMutation,
  useGetMedicamentByIdQuery,
  useGetMedicamentsListQuery,
  useCreateMedicamentMutation,
  useModifyMedicamentMutation
} from "./redux";
import { useState } from "react";

export default function App() {
  const [deleteId, setDeleteId] = useState("");
  const [addName, setAddName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [modifyId, setModifyId] = useState("");
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5hZ2VyMUBlbWFpbC5jb20iLCJpYXQiOjE2NjY3OTMzNzQsImV4cCI6MTY2ODc5MzM3NH0.jglPS8lKvNu9Fg5b4wgHm0L82xiav3cq9BWd1L-WHz234hnUI3bJwlZl1WSmRTBI3_j5oJ4YmyiEu-G64P1r8g";
  localStorage.setItem("token", token);
  const { data: medicamentById } = useGetMedicamentByIdQuery(searchId);
  const { data: medicamentsList } = useGetMedicamentsListQuery();

  const [createMedicament] = useCreateMedicamentMutation();
  const [deleteMedicament, { error: deleteError }] = useDeleteMedicamentByIdMutation();
  const [modifyMedicament, { error: modifyError }] = useModifyMedicamentMutation();

  const bodyRequest =
  {
    "manufactureName": "Фабрика имени Ленина",
    "name": addName,
    "iconUrl": "изображение",
    "description": "3 раза в день после еды"
  }

  const handleCreateMedicament = async () => {
    await createMedicament(bodyRequest)
  }

  const handleDeleteMedicament = async () => {
    await deleteMedicament(deleteId)
  }

  const handleModifyMedicament = async () => {
    console.log("bodyRequest = ", bodyRequest)
    console.log("modifyId = ", modifyId)
    console.log({ bodyRequest, modifyId })
    await modifyMedicament({ bodyRequest, modifyId })
  }

  if (medicamentsList) {
    console.log("MedicamentsList = ", " ", medicamentsList);
  }
  if (deleteError) {
    console.log("Ошибка удаления! = ", deleteError)
  }



  return (
    <div className="App">
      <div className="input">
        <input
          type="text"
          value={searchId}
          onChange={(event) => { setSearchId(event.target.value) }}
        />
        <button onClick={() => console.log("MedicamentById = ", " ", medicamentById)}>Поиск медикамента по Id</button>
      </div>
      <div className="input">
        <button onClick={() => console.log("MedicamentsList = ", " ", medicamentsList)}>Вывести список препаратов</button>
      </div>
      <div className="input">
        <input
          type="text"
          value={deleteId}
          onChange={(event) => { setDeleteId(event.target.value) }}
        />
        <button onClick={handleDeleteMedicament}>Удалить медикамент</button>
      </div>
      <div className="input">
        <input
          type="text"
          value={addName}
          onChange={(event) => { setAddName(event.target.value) }}
        />
        <button onClick={handleCreateMedicament}>Добавить медикамент</button>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="id"
          value={modifyId}
          onChange={(event) => { setModifyId(event.target.value) }}
        />
        <input
          type="text"
          placeholder="name"
          value={addName}
          onChange={(event) => { setAddName(event.target.value) }}
        />
        <button onClick={handleModifyMedicament}>Изменить медикамент</button>
      </div>
    </div>
  );
}
