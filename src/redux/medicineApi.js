import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const medicineApi = createApi({
  reducerPath: "medicineApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://91.241.64.154:8080/",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("token");
      console.log("Наш токен равен ", token);
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      return header;
    }
  }),

  endpoints: (build) => ({

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
      })
    })

  })
});

export const { useGetMedicamentByIdQuery, useGetMedicamentsListQuery } = medicineApi;
