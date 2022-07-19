import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react'

import {SimpleSelect} from "./SimpleSelect";




export default {
    title: 'SimpleSelect',
    component: SimpleSelect,
};



export const WithValue: ComponentStory<typeof SimpleSelect> = (args) =>
{

    const [value,setValue]=useState<number| null>(1)
    console.log(value)

    return <>
        <SimpleSelect onSelected={setValue}
                      value={value}
                      items={[
                    {title: 'Minsk', value: 1},
                    {title: 'Kyiv', value: 2},
                    {title: 'Ryga', value: 3},
                ]}/>
    </>
}


export const WithoutValue: ComponentStory<typeof SimpleSelect> = (args) =>
{ const [value,setValue]=useState<number| null>(null)
    return <>
        <SimpleSelect onSelected={setValue}
                      value={value}
                      items={[
                    {title: 'Vilnius', value: 1},
                    {title: 'Kyiv', value: 2},
                    {title: 'Ryga', value: 3},
                ]}/>
    </>
}