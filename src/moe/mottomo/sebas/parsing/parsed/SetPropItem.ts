import PrimitiveValue from "./PrimitiveValue";
import InterpolationBody from "./primitive_body/InterpolationBody";

interface SetPropItem {

    name: string;
    value: PrimitiveValue<number & string & InterpolationBody>;

}

export default SetPropItem;
