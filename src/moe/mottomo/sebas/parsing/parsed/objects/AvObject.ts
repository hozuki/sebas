import PrimitiveValue from "../PrimitiveValue";

interface AvObject {

    /**
     * 视频av号
     */
    av: PrimitiveValue<number>;
    /**
     * 视频分P号
     */
    page?: PrimitiveValue<number>;
    /**
     * 视频开始播放点
     */
    time?: PrimitiveValue<number>;

}

export default AvObject;
