import React, {useState} from "react";
import MultipleSelect from "./MultiplySelect/MultipleSelect";
import {SimpleSelect} from "./SimpleSelect/SimpleSelect";
import {ComponentStory} from "@storybook/react";


export const Dropdown = () => {



        const [selected, setSelected] = useState<any[]>([])
        console.log(selected)

        const options = [
            {title: 'Minsk', value: 1},
            {title: 'Kyiv', value: 2},
            {title: 'Ryga', value: 3},
            {title: 'Vilnius', value: 4},
            {title: 'Kaunas', value: 5},
        ]

        return <MultipleSelect
                handlerChange={setSelected}
                options={options}
            />





}



