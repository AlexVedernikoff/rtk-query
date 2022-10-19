import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    deleteMedicamentById: build.mutation({
      query: (id) => ({
        url: `/api/manager/medicine/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{type: 'medicaments', id:'LIST' }]
    }),

    //2. Поиск препарата по ID
    getMedicamentById: build.query({
      query: (id) => ({
        url: `api/manager/medicine/${id}`
      })
    }),

    //3. Поиск списка препаратов
    getMedicamentsList: build.query({
      query: () => ({
        url: `api/manager/medicine`
      }),
      providesTags: (result) =>  result
        ? [
            ...result.map(({ id }) => ({ type: 'medicaments', id })),
            { type: 'medicaments', id: 'LIST' },
          ]
        : [{ type: 'medicaments', id: 'LIST' }],
    }),

    //4. Создание нового препарата
    createMedicament: build.mutation({
      query: (body) => ({
        url: `api/manager/medicine`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{type: 'medicaments', id:'LIST' }]
    }),

     //5. Изменение препарата по ID
     modifyMedicament: build.mutation({
      query: ({bodyRequest, modifyId}) => ({
        url: `/api/manager/medicine/${modifyId}`,
        method: 'PUT',
        body: bodyRequest
      }),
      invalidatesTags: [{type: 'medicaments', id:'LIST' }]
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
