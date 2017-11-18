import Unpacker from "./Unpacker";
import grammar from "./grammar";
import schemas from "./schemas";

export default () => {
    describe("Parsing", () => {
        grammar();
        schemas();
        Unpacker();
    });
};
