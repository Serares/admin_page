import axiosConfig from "../config/Axios";
import headers from "../utils/headers";

//TODO replace links
const AdminProperties = {
    getAll() {
        return axiosConfig.get(`admin/getProperties`, { headers: headers() });
    },
    getApartment(shortId: string) {
        return axiosConfig.get(`admin/getApartment/${shortId}`, { headers: headers() });
    },
    addApartment(data: any) {
        return axiosConfig.post(`admin/addApartment`, data, { headers: headers() });
    },
    updateApartment(data: any, shortId: string) {
        return axiosConfig.put(`admin/updateApartment/${shortId}`, data, { headers: headers() });
    },
    removeApartment(shortId: any) {
        return axiosConfig.delete(`admin/removeApartment/${shortId}`, { headers: headers() });
    },
    getHouse(shortId: string) {
        return axiosConfig.get(`admin/getHouse/${shortId}`, { headers: headers() });
    },
    addHouse(data: any) {
        return axiosConfig.post(`admin/addHouse`, data, { headers: headers() });
    },
    updateHouse(data: any, shortId: string) {
        return axiosConfig.put(`admin/updateHouse/${shortId}`, data, { headers: headers() });
    },
    removeHouse(shortId: any) {
        return axiosConfig.delete(`admin/removeHouse/${shortId}`, { headers: headers() });
    },
    getLand(shortId: string) {
        return axiosConfig.get(`admin/getLand/${shortId}`, { headers: headers() });
    },
    addLand(data: any) {
        return axiosConfig.post(`admin/addLand`, data, { headers: headers() });
    },
    updateLand(data: any, shortId: string) {
        return axiosConfig.put(`admin/updateLand/${shortId}`, data, { headers: headers() });
    },
    removeLand(shortId: any) {
        return axiosConfig.delete(`admin/removeLand/${shortId}`, { headers: headers() });
    }
};

export default AdminProperties;
