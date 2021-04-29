export const isTokenValid = (): boolean => {
    const token = window.localStorage.getItem("adminToken");
    if (token) {
        let payload = JSON.parse(window.atob(token.split(".")[1]));

        return payload.exp > Date.now() / 1000;
    } else {
        return false;
    }
};

export const tokenPayload = (): { [key: string]: string } | undefined => {
    if (isTokenValid()) {
        var token = window.localStorage.getItem("adminToken");
        if (!token) return undefined;
        var payload = JSON.parse(window.atob(token.split('.')[1]));
        return { ...payload };
    }
}
