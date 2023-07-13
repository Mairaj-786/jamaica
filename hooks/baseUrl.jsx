import axios from "axios";


export const baseUrl = 'https://backend.topeventsinjamaica-test.info/api/v1'

export const config = {
    headers: {
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaHNpbjFAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoiNjNlMjJlZTFlZTg2ZmEyZDMwNjU4ZGM0IiwiaWF0IjoxNjc1NzkxMTkzfQ.VK_NSeq6DGFjXFPZjzpkb5cX3_VLDCadkb04HllrTps'
    }
}
export const configFormData = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X3R5cGUiOiJIT1NUIiwidXNlcm5hbWUiOiJzaGFocm96MjIiLCJpZCI6IjYzM2RhN2JmOGZhMmQwMDhlMzdmMjAwYSIsImlhdCI6MTY2NjQ1NTczNn0.sapjwgtovw-a6Bakz6bP3HA3dEhajJof3Y7fVjSukV8'
    }
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const fetcherToken = (url, token) =>
    axios
        .get(url, {
            headers: {
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaHNpbjFAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoiNjNlMjJlZTFlZTg2ZmEyZDMwNjU4ZGM0IiwiaWF0IjoxNjc1NzkxMTkzfQ.VK_NSeq6DGFjXFPZjzpkb5cX3_VLDCadkb04HllrTps'
            }
        })
        .then((res) => res.data);

export const fetcherPost = async (url, body) => {
    await axios.post(url, body, {
        headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaHNpbjFAbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoiNjNlMjJlZTFlZTg2ZmEyZDMwNjU4ZGM0IiwiaWF0IjoxNjc1NzkxMTkzfQ.VK_NSeq6DGFjXFPZjzpkb5cX3_VLDCadkb04HllrTps'
        }
    })
        .then((res) => res.data);
}