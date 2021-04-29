
export default function TransactionTypeValues(transactionType: number) {
    let value = "";
    switch (transactionType) {
        case (1):
            value = "Vanzare";
            break;
        case (2):
            value = "Cumparare";
            break;
    }

    return value;
}