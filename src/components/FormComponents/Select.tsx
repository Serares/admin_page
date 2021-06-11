import React from 'react';

type SelectProps = {
    color: any,
    options: { value: number | string, text: string }[],
    title: string,
    name: string,
}

export default function CustomSelect(props: SelectProps) {
    const { color, options, title, name } = props;
    return (
        <React.Fragment>
            <label id={`select-${title}`}>{title}</label>
            <select className="form-control" placeholder={title}>
                {options.map(item => <option key={item.value} value={item.value}>{item.text}</option>)}
            </select>
        </React.Fragment>
    )
}
