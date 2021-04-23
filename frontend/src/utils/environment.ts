
export const prod = process.env.NODE_ENV === "production" ? true : false;

const GCS_BUCKET = prod ? process.env.REACT_APP_GCS_BUCKET_PROD : process.env.REACT_APP_GCS_BUCKET_DEV;

export const BASE_IMAGE_URL = (path: string) => {
    return `https://storage.googleapis.com/${GCS_BUCKET}/${path}`;
};

export const BACKEND_URL = prod ? process.env.REACT_APP_BACKEND_URL_PROD : process.env.REACT_APP_BACKEND_URL_DEV;



