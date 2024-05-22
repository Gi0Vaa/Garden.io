import { useEffect, useState } from "react";

import Prop from "./prop";

const Suggestions = ({name, setSearch, setSelectedProp, setIsSelected, searchResults}) => {
    const [props, setProps] = useState([]);

    useEffect(() => {
        console.log(searchResults);
        searchResults(name)
            .then(res => setProps(res));
    }, [name, searchResults]);

    if(props.length === 0) return (<div></div>);
    return (
        <div className="flex flex-col gap-1 w-full mt-1 overflow-y-auto max-h-40">
            {props.map((p, index) => <Prop key={index} prop={p} setSearch={setSearch} setSelectedProp={setSelectedProp} setIsSelected={setIsSelected} />)}
        </div>
    );
}

export default Suggestions;