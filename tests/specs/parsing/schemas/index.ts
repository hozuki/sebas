import objects from "./objects";
import primitives from "./primitives";

export default () => {
    describe("Schemas", () => {
        objects();
        primitives();
    });
};
