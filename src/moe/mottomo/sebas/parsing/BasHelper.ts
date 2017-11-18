import BasParsingOptions from "./BasParsingOptions";
import * as parser from "./grammar/bas_parser";

abstract class BasHelper {

    static parse(text: string, options?: BasParsingOptions): any {
        return parser.parse(text, options);
    }

    static parseAs<T>(text: string, options?: BasParsingOptions): T {
        return BasHelper.parse(text, options) as T;
    }

    static unpack(value: TypedValueStore): { type: string; value: any } {
        // assert.deepStrictEqual compares enumerable properties, including __proto__.
        // So we can't use Object.create(null) here.
        const valueObject: TypedValueStore = {type: value.type || "", value: {}};

        if (!("properties" in value) || !Array.isArray(value.properties) || value.properties.length <= 0) {
            return valueObject as { type: string; value: any };
        }

        const primitiveTypes: string[] = [
            "number", "string", "time", "percentage"
        ];

        const properties: NameValuePair[] = value.properties;
        for (const prop of properties) {
            if (primitiveTypes.indexOf(prop.value.type) >= 0) {
                // Primitive value
                valueObject.value[prop.name] = prop.value;
            } else {
                if ("properties" in prop.value && Array.isArray(prop.value["properties"])) {
                    // Aggregated value object (of another type in the docs)
                    valueObject.value[prop.name] = BasHelper.unpack(prop.value);
                } else {
                    // Simple value object (literal object value)
                    valueObject.value[prop.name] = prop.value;
                }
            }
        }

        return valueObject as { type: string; value: any };
    }

}

interface TypedValueStore {
    type?: string;
    value?: any;
    properties?: NameValuePair[];
}

interface NameValuePair {
    name: string;
    value: TypedValueStore;
}

export default BasHelper;
