import {createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const shazamCoreApi = createApi({
    reducerPath:'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '26e4a32d23msh6afba2a97ce941cp14c8e5jsn110e5b9a06e3');
            //764b57a247mshecfbeff47cba933p1bbc3ajsnb0e8e1a57c61
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query : () => '/charts/track'}),
        getSongDetails: builder.query({ query: (songid) => `/songs/get-details?key=${songid}`}),
        getArtistSongs: builder.query({ query: (artistid) => `/artists/get-top-songs?id=${artistid}` }),
        getSearch: builder.query({query: (term) => `/search?term=${term}`}),
        getArtistDetails: builder.query({query: (adamid) => `/artists/get-summary?id=${adamid}`}),
        getSongDetailsV2: builder.query({query: (songid) => `/songs/v2/get-details?id=${songid}`}),
        getArtistAlbums: builder.query({query: (artistid) => `/artists/get-summary?id=${artistid}`})
    })
})

export const { useGetTopChartsQuery,
useGetSongDetailsQuery,useGetArtistSongsQuery,
useGetSearchQuery, useGetArtistDetailsQuery, useGetSongDetailsV2Query, useGetArtistAlbumsQuery } = shazamCoreApi;    
