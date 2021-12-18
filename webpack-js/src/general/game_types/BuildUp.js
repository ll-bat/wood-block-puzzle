import GameStarter from "../../core/abstract/GameStarter";
import $layout from "../../core/drawer/Layout";
import $figureMover from "../../core/events/FigureMover";
import $figureOnBoardMatcher from "../../core/events/next_handler/FigureOnBoardMatcher";
import $mouseUpHandler from "../../core/events/next_handler/relax/MouseUpHandler";
import $randomFigureOnBoardChecker from "../../core/events/next_handler/relax/RandomFigureOnBoardChecker";
import EVENTS from "../../core/events/Events";
import $randomFigureClickerMiddleWare from "../../core/middlewares/RandomFigureClickerMiddleWare";
import $gameStateChecker from "../../core/events/next_handler/relax/GameStateChecker";
import RandomFigureEventHelper from "../../core/events/next_handler/relax/RandomFigureEventHelper";
import $boxes from "../../shared/store/Boxes";
import $boxUpdateHandler from "../../core/events/next_handler/relax/BoxUpdateHandler";
import $afterRandomFigurePutOnBoardHandler from "../../core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler";
import STATE from "../../shared/store/leaves/State";
import $randomFigureDrawer from "../../core/drawer/concrete/relax/RandomFiguresDrawer";
import $boxOnboardCrasher from "../../Helper/relax/BoxOnboardCrasher";
import FUNC from "../Custom";

export default class BuildUp extends GameStarter {
    constructor() {
        super();
    }

    start(...params) {
        $layout.draw();
        $figureMover.registerHandler(EVENTS.MOUSE_MOVE, $figureOnBoardMatcher);
        $figureMover.registerHandler(EVENTS.MOUSE_UP, $mouseUpHandler);
        $figureMover.registerHandler(EVENTS.MOUSE_UP, $randomFigureOnBoardChecker);
        $figureMover.addMiddleware(EVENTS.BEFORE_MOUSE_DOWN ,$randomFigureClickerMiddleWare);
        $figureMover.afterClick($gameStateChecker);
        // RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents();
        $boxes.registerHandler(EVENTS.BOX_UPDATE, $boxUpdateHandler);
        $boxes.registerHandler(EVENTS.BOARD_CHANGE, $afterRandomFigurePutOnBoardHandler);
        $boxes.getBoxes().forEach(boxes => {
            boxes.forEach(box => {
                FUNC.attach(box.getDiv(), EVENTS.MOUSE_DOWN, e => box.toggleBusy(true))
            })
        })
    }

    reset(...params) {
        STATE.relax.reset();
        $boxes.reset();
        $randomFigureDrawer.reset();
        $boxOnboardCrasher.reset();
        // remove this line and fix issues
        document.location.reload();
    }

    restart(...params) {
        this.reset();
        this.start();
    }

    lose(...params) {
        this.restart();
    }
}