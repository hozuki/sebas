import Abstract from "../decorators/Abstract";
import DefaultSerializer from "./DefaultSerializer";
import ISerializer from "./ISerializer";

const defaultSerializer = new DefaultSerializer();

@Abstract
abstract class Serializer<TObj, TRep> implements ISerializer<TObj, TRep> {

    static getDefault<U extends object>(): ISerializer<U, string> {
        return defaultSerializer as any as ISerializer<U, string>;
    }

    abstract serialize(object: TObj): TRep;

    abstract deserialize(data: TRep): TObj;

    static get default(): ISerializer<any, string> {
        return defaultSerializer;
    }

}

export default Serializer;
