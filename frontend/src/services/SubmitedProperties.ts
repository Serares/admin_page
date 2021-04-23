import axiosConfig from "../config/Axios";
import headers from "../utils/headers";

//TODO replace links
const SubmitedProperties = {
  getAll() {
    return axiosConfig.get(`admin/getAllSubmitedProperites`, { headers: headers() });
  },
  getSingle(shortId: string) {
    return axiosConfig.get(`admin/getOneSubmitedProperty/${shortId}`, { headers: headers() });
  },
  remove(shortId: string, gcsSubfolderId: string) {
    return axiosConfig.delete(`admin/removeOneSubmitedProperty/${shortId}/${gcsSubfolderId}`, { headers: headers() });
  }
};

export default SubmitedProperties;
