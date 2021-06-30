import $layout from "./core/drawer/Layout";
import DomNegotiator from "./negotiators/DomNegotiator";
import $randomFigureDrawer from "./core/drawer/concrete/relax/RandomFiguresDrawer";
import $figureMover from "./core/events/FigureMover";
import $figureOnBoardMatcher from "./core/events/next_handler/FigureOnBoardMatcher";
import $mouseUpHandler from "./core/events/next_handler/relax/MouseUpHandler";
import RandomFigureEventHelper from "./core/events/next_handler/relax/RandomFigureEventHelper";
import $boxes from "./shared/store/Boxes";
import EVENTS from "./core/events/Events";
import $boxUpdateHandler from "./core/events/next_handler/relax/BoxUpdateHandler";
import $afterRandomFigurePutOnBoardHandler from "./core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler";
import $randomFigureOnBoardChecker from "./core/events/next_handler/relax/RandomFigureOnBoardChecker";
import $randomFigureClickerMiddleWare from "./core/middlewares/RandomFigureClickerMiddleWare";
import $gameStateChecker from "./core/events/next_handler/relax/GameStateChecker";

$layout.setup(new DomNegotiator('#content'));
$layout.draw();

$figureMover.registerHandler('mousemove', $figureOnBoardMatcher);
$figureMover.registerHandler('mouseup', $mouseUpHandler);
$figureMover.registerHandler('mouseup', $randomFigureOnBoardChecker);
$figureMover.addMiddleware($randomFigureClickerMiddleWare);
$figureMover.afterClick($gameStateChecker);
// $figureMover.registerHandler(EVENTS.BEFORE_FIGURE_CLICK, $randomFigureClicker, false);

$randomFigureDrawer.setup(new DomNegotiator('#figures'));
RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents();

$boxes.registerHandler(EVENTS.BOX_UPDATE, $boxUpdateHandler);
$boxes.registerHandler(EVENTS.BOARD_CHANGE, $afterRandomFigurePutOnBoardHandler);