import DefSubPropObject from "./DefSubPropObject";
import PrimitiveValue from "./PrimitiveValue";

interface DefPropItem {

    name: string;
    value: PrimitiveValue<any> & DefSubPropObject;

}

export default DefPropItem;
