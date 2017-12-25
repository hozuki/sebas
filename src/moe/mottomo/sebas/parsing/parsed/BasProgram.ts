import DefObject from "./DefObject";
import SetObject from "./SetObject";

interface BasProgram {

    readonly defs: DefObject[];
    readonly sets: SetObject[];

}

export default BasProgram;
