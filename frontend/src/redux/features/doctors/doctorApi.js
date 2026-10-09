import { baseApi } from "@/lib/api/baseApi";

export const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "/doctors",
    }),

    createDoctor: builder.mutation({
      query: (doctor) => ({
        url: "/doctors",
        method: "POST",
        body: doctor,
      }),
    }),
  }),
});

export const { useGetDoctorsQuery, useCreateDoctorMutation } = doctorApi;
