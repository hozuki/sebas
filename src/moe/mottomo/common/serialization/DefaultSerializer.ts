import Override from "../decorators/Override";
import Serializer from "./Serializer";

export default class DefaultSerializer extends Serializer<any, string> {

    @Override()
    serialize(object: any): string {
        return JSON.stringify(object);
    }

    @Override()
    deserialize(data: string): any {
        return JSON.parse(data);
    }

}
