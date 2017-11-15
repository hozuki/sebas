import PrimitiveValue from "./PrimitiveValue";
import DefSubPropObject from "./DefSubPropObject";

interface DefPropItem {

    name: string;
    value: PrimitiveValue<any> & DefSubPropObject;

}

export default DefPropItem;
