import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import {RootState} from "@/app/store";

export type PostType = {
    uid?: string,

}
export const postApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `/post`,
        prepareHeaders: (headers, { getState }) => {
            const authorization = (getState() as RootState).auth.userDetail?.authorization;
            if (authorization) {
              headers.set('Authorization', `Bearer ${authorization}`);
            }
            return headers;
          },
    }),
    reducerPath: "postApi",
    tagTypes: ["Post"],
    keepUnusedDataFor: 1000 * 60 * 60 * 24 * 30, // 30 days
    endpoints: (builder) => ({})
})

export const {} = postApi