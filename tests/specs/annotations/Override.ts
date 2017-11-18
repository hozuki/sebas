import * as assert from "assert";
import Abstract from "../../../src/moe/mottomo/common/decorators/Abstract";
import Override from "../../../src/moe/mottomo/common/decorators/Override";
import SpecHelper from "../SpecHelper";

export default () => {
    describe("@Override", () => {

        @Abstract
        abstract class AbstractParent {
            abstract func(): string;
        }

        it("should pass when a method overrides that in an abstract class", () => {
            class Parent extends AbstractParent {
                @Override()
                func(): string {
                    return "Parent::func()";
                }
            }
        });

        it("should pass when a method overrides that in a concrete class", () => {
            class Parent extends AbstractParent {
                @Override()
                func(): string {
                    return "Parent::func()";
                }
            }

            class Child extends Parent {
                @Override()
                func(): string {
                    return "Child::func()";
                }
            }
        });

        it("should pass when a method overrides a non-existing method in an abstract class", () => {
            class Parent extends AbstractParent {
                @Override()
                func(): string {
                    return "Parent::func()";
                }

                @Override()
                func1(): string {
                    return "Parent::func1()";
                }
            }
        });

        it("should throw when a method overrides a non-existing method in a concrete class", () => {
            const r = SpecHelper.expectErrors((): void => {
                class Parent extends AbstractParent {
                    @Override()
                    func(): string {
                        return "Parent::func()";
                    }
                }

                class Child extends Parent {
                    @Override()
                    func1(): string {
                        return "Child::func1()";
                    }

                    @Override()
                    func(): string {
                        return "Child::func()";
                    }
                }
            }, TypeError);

            assert.ok(r.ok, r.message);
        });
    });
};
