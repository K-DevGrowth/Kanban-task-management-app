import {useState} from "react";

const useChecked = (initialValue = false) => {
    const [checked, setChecked] = useState<boolean>(initialValue)

    const onChange = (e) => {
        setChecked(e.target.checked)
    }

    return {checked, onChange}
}

export default useChecked;