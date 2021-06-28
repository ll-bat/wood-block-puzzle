import NextHandler from "../../../abstract/NextHandler";
import $boxOnboardCrasher from "../../../../Helper/relax/BoxOnboardCrasher";

class AfterRandomFigurePutOnBoardHandler extends NextHandler {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        $boxOnboardCrasher.checkBlocksToCrash();
    }

}

const $afterRandomFigurePutOnBoardHandler = new AfterRandomFigurePutOnBoardHandler();
export default $afterRandomFigurePutOnBoardHandler;