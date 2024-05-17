import { useEffect, useState } from "react";
import { getPlantsByName } from "../../../services/plants";

import Prop from "./prop";

const Suggestions = ({name, setSearch, setSelectedProp, setIsSelected}) => {
    const [props, setProps] = useState([]);

    useEffect(() => {
        getPlantsByName(name)
            .then(res => setProps(res.data));
    }, [name]);

    return (
        <div className="flex flex-col gap-1 w-full">
            {props.map((p, index) => <Prop key={index} prop={p} setSearch={setSearch} setSelectedProp={setSelectedProp} setIsSelected={setIsSelected} />)}
        </div>
    );
}

export default Suggestions;