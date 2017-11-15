import SetStatementUnit from "./SetStatementUnit";

interface SetObject {

    first: SetStatementUnit;
    then?: SetObject[];

}

export default SetObject;
