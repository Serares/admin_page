export default function base64ToBlob(base64: any, mime: any): Promise<Blob> {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    return new Promise((resolve) => {
        let byteArrays = [];
        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        resolve(new Blob(byteArrays, { type: mime }));
    })

};
