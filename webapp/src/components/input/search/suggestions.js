import { useEffect, useState } from "react";
import { getPlantsByName } from "../../../services/plants";

import Prop from "./prop";

const Suggestions = ({name, setSearch}) => {
    const [props, setProps] = useState([]);

    useEffect(() => {
        if(name === ''){
            setProps([]);
            return;
        }
        getPlantsByName(name)
            .then(res => setProps(res.data));
    }, [name]);

    return (
        <div className="flex flex-col gap-1 w-full">
            {props.map((p, index) => <Prop key={index} prop={p} setSearch={setSearch} />)}
        </div>
    );
}

export default Suggestions;