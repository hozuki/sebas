import ISerializer from "./ISerializer";

interface ISerializable<TObj> {

    serializeTo(serializer: ISerializer<ISerializable<TObj>, any>): any;

    deserializeFrom(data: any, serializer: ISerializer<ISerializable<TObj>, any>): void;

}

export default ISerializable;
