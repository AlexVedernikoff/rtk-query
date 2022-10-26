import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MedicineResponse, MedicineRequest } from '../types/ManagerDTO/ManagerDTO.js';

// interface Post {
//   id: number,
//   type: 'medicaments'
// }
// type PostsResponse = Post[]

type ResponseList = MedicineResponse[];
type ModifyRequest = {
  bodyRequest: MedicineRequest,
  modifyId: number
}

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  tagTypes: ['medicaments'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://91.241.64.154:8080/",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("token");
      console.log("Наш токен равен ", token);
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      header.set("accept", "*/*");
      header.set("Content-Type", "application/json");

      return header;
    }
  }),

  endpoints: (build) => ({

    //1. Удаление препарата по ID
    deleteMedicamentById: build.mutation<any, number>({
      query: (id) => ({
        url: `/api/manager/medicine/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'medicaments', id: 'LIST' }]
    }),

    //2. Поиск препарата по ID
    getMedicamentById: build.query<MedicineResponse, any>({
      query: (id) => ({
        url: `api/manager/medicine/${id}`
      })
    }),

    //3. Поиск списка препаратов
    getMedicamentsList: build.query<ResponseList, number>({
      query: () => ({
        url: `api/manager/medicine`
      }),
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'medicaments' as const, id })),
          { type: 'medicaments', id: 'LIST' },
        ]
        : [{ type: 'medicaments', id: 'LIST' }],
    }),

    //4. Создание нового препарата
    createMedicament: build.mutation<MedicineRequest, any>({
      query: (body) => ({
        url: `api/manager/medicine`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'medicaments', id: 'LIST' }]
    }),

    //5. Изменение препарата по ID
    modifyMedicament: build.mutation<number, ModifyRequest>({
      query: ({ bodyRequest, modifyId }) => ({
        url: `/api/manager/medicine/${modifyId}`,
        method: 'PUT',
        body: bodyRequest
      }),
      invalidatesTags: [{ type: 'medicaments', id: 'LIST' }]
    })

  })
});

export const {
  useDeleteMedicamentByIdMutation,
  useGetMedicamentByIdQuery,
  useGetMedicamentsListQuery,
  useCreateMedicamentMutation,
  useModifyMedicamentMutation
} = medicineApi;
