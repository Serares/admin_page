
export default function PropertyTypeValues(propType: number) {
    let value = "";
    switch (propType) {
        case (1):
            value = "Apartament";
            break;
        case (2):
            value = "Casa";
            break;
        case (3):
            value = "Teren";
            break;
    }

    return value;
}