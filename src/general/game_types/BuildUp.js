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
import $randomBoard from "../../core/logic/build-up/BoardBuilder";
import FUNC from "../Custom";
import CONSTANTS from "../Constants";
import $figurePlaceChecker from "../../core/logic/FigurePlaceChecker";
// import $figures from "../../../drawer/figures/Figures";
import $figures from "../../core/drawer/figures/Figures";
import AllFigures from "../../core/drawer/figures/leaves/AllFigures";

export default class BuildUp extends GameStarter {
    constructor() {
        super();
        this.shouldStopSimulation = false;
    }

    start(...params) {
        $layout.draw();
        this.drawRightPanel();
        $figureMover.registerHandler(EVENTS.MOUSE_MOVE, $figureOnBoardMatcher);
        $figureMover.registerHandler(EVENTS.MOUSE_UP, $mouseUpHandler);
        $figureMover.registerHandler(EVENTS.MOUSE_UP, $randomFigureOnBoardChecker);
        $figureMover.addMiddleware(EVENTS.BEFORE_MOUSE_DOWN ,$randomFigureClickerMiddleWare);
        // $figureMover.afterClick($gameStateChecker);
        RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents();
        $boxes.registerHandler(EVENTS.BOX_UPDATE, $boxUpdateHandler);
        $boxes.registerHandler(EVENTS.BOARD_CHANGE, $afterRandomFigurePutOnBoardHandler);
        $boxes.getBoxes().forEach(boxes => {
            boxes.forEach(box => {
                FUNC.attach(box.getDiv(), EVENTS.MOUSE_DOWN, e => box.toggleBusy(true))
            })
        })

        const randomBoard = $randomBoard.getBoard();
        $boxes.useLayout(randomBoard.getLayout());

        const tools = this.addToolsToRightPanel();
    }

    drawRightPanel() {
        const layoutInfo = $layout.getLayoutInfo();

        const $panel = FUNC.elt('div', 'position-absolute', 'build-up-panel', {
            'left': layoutInfo.end.x + 20 + 'px',
            'top': layoutInfo.start.y + 'px',
            'width': 300 + 'px',
            'height': (layoutInfo.end.y - layoutInfo.start.y) + 'px',
            'border': '2px solid black',
            'background': CONSTANTS.boxDefaultColor,
        })

        document.body.appendChild($panel)

        const $toolsDiv = FUNC.elt('div', 'position-relative text-center', 'build-up-panel-tools', {
            width: '300px'
        })
        $panel.appendChild($toolsDiv);
    }

    getRightPanelDiv() {
        return FUNC.$('#build-up-panel-tools') 
    }

    createNextRandomBoardButton() {
        const $nextRandomBoardButton = FUNC.elt('button', 'btn btn-outline-primary m-2 mt-3', 'panel-next-random-board');
        $nextRandomBoardButton.innerText = 'Draw next random board'
        $nextRandomBoardButton.addEventListener('click', e => {
            $boxes.resetBoard();
            const board = $randomBoard.getBoard();
            $boxes.useLayout(board.getLayout());
        })
        return $nextRandomBoardButton;
    }

    createResetBoardButton() {
        const $resetBoardButton = FUNC.elt('button', 'btn btn-outline-danger m-2 mt-3', 'panel-reset-board');
        $resetBoardButton.innerText = 'Reset board'
        $resetBoardButton.addEventListener('click', e => {
            $boxes.resetBoard();
        })
        return $resetBoardButton;
    }

    createRandomFiguresButton() {
        const $randomFiguresButton = FUNC.elt('button', 'btn btn-outline-warning m-2 mt-3', 'panel-random-figures');
        $randomFiguresButton.innerText = 'Random figures'
        $randomFiguresButton.addEventListener('click', e => {
            RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents();
        })
        return $randomFiguresButton;
    }

    runSimulation(figures) {
        this.shouldStopSimulation = false;

        console.log('runSimulation')
        // const figures = STATE.relax.getFigures().slice();
        const self = this;
        const savedBoard = $boxes.getLayout();

        let figureIndex = 0;

        function run() {
            console.log('runSimulation: run()')
            let isDone = false;
            for (let i = 0; i < CONSTANTS.boxesOnRow && !isDone; i++) {
                for (let j = 0; j < CONSTANTS.boxesOnColumn && !isDone; j++) {
                    if ($figurePlaceChecker.isDrawable({x: i, y: j}, figures[figureIndex].name)) {
                        // console.log('putting ' + figures[figureIndex].name + ' on: ', i, j)
                        const innerSavedBoard = $boxes.getLayout();
                        const matrix = $figures.getFigure(figures[figureIndex].name).toMatrix();
                        $boxes.updateMatrix(matrix, {x: i, y: j});
                        $boxOnboardCrasher.checkBlocksToCrash()

                        if (figureIndex === figures.length - 1) {
                            if (self.isSimulationDone()) {
                                isDone = true;
                                console.log('---------------------------')
                                console.log(i, j);
                            } else {
                                $boxes.useLayout(innerSavedBoard);
                            }
                            continue;
                        }

                        figureIndex++;
                        isDone = run(); 
                        figureIndex--;

                        $boxes.useLayout(innerSavedBoard);

                        if (isDone) {
                            console.log(i, j);
                        }
                    }
                }
            }
            return isDone;
        }
        const canBeDone = run();
        $boxes.useLayout(savedBoard);
        return canBeDone;
    }

    createRunSimulationButton() {

        const $runSimulation = FUNC.elt('button', 'btn btn-warning m-2 mt-3', 'panel-run-simulation');
        $runSimulation.innerText = 'Run simulation'
        $runSimulation.addEventListener('click', async e => {
            $boxOnboardCrasher.setAnimateCrashing(false);
         
            let iteration = 0;
            let maxIterations = 1000;
            while (true) {
                if (iteration++ === maxIterations) {
                    console.log('iterations finished')
                    break;
                }

                const yes = this.isRandomBoardPlayable();
                if (yes) {
                    console.log('found such placement')
                    break;
                }
                // $boxes.resetBoard();
                // const board = $randomBoard.getBoard();
                // $boxes.useLayout(board.getLayout());
                console.log('once')
                break;
            }
            $boxOnboardCrasher.setAnimateCrashing(true);
        })
        return $runSimulation;
    }

    boardBoxesCount() {
        let cnt = 0;
        for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
            for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
                if ($boxes.get(i, j).isBusy()) {
                    cnt++;
                }
            }
        }
        return cnt;
    }

    getAllFigures() {
        const figures = [];
        for (const figure in AllFigures) {
            figures.push($figures.getFigure(figure));
        }
        return figures;
    }

    getAll3FigureCombination() {
        if (this._all3Combinations) {
            return this._all3Combinations;
        }
        const figures = this.getAllFigures();
        const figuresLength = figures.length;
        const allCombination = [];
        for (let i = 0; i < figuresLength; i++) {
            for (let j = 0; j < figuresLength; j++) {
                for (let k = 0; k < figuresLength; k++) {
                    allCombination.push([figures[i], figures[j], figures[k]]);
                }
            }
        }
        this._all3Combinations = allCombination;
        return allCombination;
    }

    isSimulationDone() {
        const boxesCount = this.boardBoxesCount();
        return boxesCount < 4;
    }

    isRandomBoardPlayable() {    
        const self = this;

        function revert(savedLayout) {
            $boxes.useLayout(savedLayout);
        }
        
        function play(figures) {
            const savedLayout = $boxes.toMatrix();
            self.runSimulation(figures);
            const yes = self.isSimulationDone();
            // revert(savedLayout);
            return yes;  
        }

        const figureCombinatoins = self.getAll3FigureCombination();
        for (const _3figCombination of figureCombinatoins) {
            const yes = play(_3figCombination);
            if (yes) {
                RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents(_3figCombination)
                return true;
            }
            console.log('done', yes)
            if (self.shouldStopSimulation) {
                break;
            }
        }

        return false; 
    }

    stopSimulation() {
        this.shouldStopSimulation = true;
    }

    createStopSimulation() {
        const $stopSimulationButton = FUNC.elt('button', 'btn btn-primary m-2 mt-3', 'panel-stop-simulation');
        $stopSimulationButton.innerText = 'Stop simulation'
        $stopSimulationButton.addEventListener('click', e => {
            this.stopSimulation();
        })
        return $stopSimulationButton;
    }

    addToolsToRightPanel() {
        const $rightPanelDiv = this.getRightPanelDiv();

        const $nextRandomBoardButton = this.createNextRandomBoardButton()
        const $resetBoardButton = this.createResetBoardButton();
        const $runSimulation = this.createRunSimulationButton();
        const $randomFigures = this.createRandomFiguresButton();
        const $stopSimulation = this.createStopSimulation();

        [$nextRandomBoardButton, $resetBoardButton, $randomFigures, $runSimulation, $stopSimulation].forEach(elm => {
            elm.style.width = '250px';
            $rightPanelDiv.appendChild(elm);
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