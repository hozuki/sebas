import AnimatedValue from "../parsing/parsed/AnimatedValue";

interface AnimationKeyValueDictionary {

    [propertyName: string]: AnimatedValue<any>;

}

export default AnimationKeyValueDictionary;
