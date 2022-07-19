import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react'


import MultipleSelect from "./MultipleSelect";

export default {
    title: 'MultipleSelect',
    component: MultipleSelect,
};


export const WithValue: ComponentStory<typeof MultipleSelect> = (args) => {

    const [selected, setSelected] = useState<any[]>([])
    console.log(selected)

    const options = [
        {title: 'Minsk', value: 1},
        {title: 'Kyiv', value: 2},
        {title: 'Ryga', value: 3},
        {title: 'Vilnius', value: 4},
        {title: 'Kaunas', value: 5},
    ]

    return <>
        <MultipleSelect

            handlerChange={setSelected}
            options={options}
        />
    </>
}


