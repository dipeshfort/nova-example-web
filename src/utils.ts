

export function dateFormat(date: Date) {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();

    const month = monthIndex + 1;

    function padZeroStr(value: number) {
        let pad = '';
        if (value < 10) {
            pad = '0';
        }
        return pad + value;
    }

    return `${year}-${padZeroStr(month)}-${padZeroStr(day)}`;
}
