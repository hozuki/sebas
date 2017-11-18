interface ISerializer<TObj, TRep> {

    serialize(object: TObj): TRep;

    deserialize(data: TRep): TObj;

}

export default ISerializer;
