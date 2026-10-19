import GameStarter from '../../core/abstract/GameStarter';
import $layout from '../../core/drawer/Layout';
import $boxes from '../../shared/store/Boxes';
import CONSTANTS from '../Constants';
import FUNC from '../Custom';
import {
    ChallengeSession,
    challengeBoardLayout,
    challengeShapeView,
    loadChallenge,
    saveChallengeProgress,
} from '../../puzzle/challenge';
import { createPlayerOutcome } from '../../puzzle/calibration';
import { getPlacement, isLegalPlacement } from '../../puzzle/core';
import $blockCrashAnimation from '../../core/animation/BlockCrashAnimation';
import { alignPieceTray, createThemePicker } from '../Appearance';
import { applyOceanDepth } from '../../puzzle/oceanDepth';
import sound from '../../puzzle/sound';

const DEFAULT_CHALLENGE_SOURCE = '/api/puzzles';

function activateWithKeyboard(element, action) {
    element.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    });
}

function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default class Challenge extends GameStarter {
    constructor(source, selector = {}) {
        super();
        this.source = source || DEFAULT_CHALLENGE_SOURCE;
        this.selector = selector;
        this.session = null;
        this.selectedShapeIndex = null;
        this.replaying = false;
        this.replayToken = 0;
        this.loadedChallenge = null;
        this.collection = Object.freeze([]);
        this.progressById = {};
        this.difficultyFilter = 'all';
        this.currentChallengeIndex = 0;
        this.invalidAttemptCount = 0;
        this.hintsUsed = 0;
        this.startedAt = null;
        this.animating = false;
        this.interactionToken = 0;
        this.dragState = null;
        this.suppressClickShapeIndex = null;
    }

    async start() {
        $layout.draw();
        this.drawPanel();
        this.setStatus('Loading challenge…', 'loading');
        try {
            const loaded = await loadChallenge(this.source, this.selector);
            this.collection = loaded.collection;
            this.progressById = { ...loaded.progress };
            this.bindBoardAnchors();
            this.activateChallenge(loaded.index);
        } catch (error) {
            this.setStatus(`Challenge could not be loaded: ${error.message}`, 'error');
            this.setControlsDisabled(true);
        }
    }

    drawPanel() {
        const oldSidebar = document.querySelector('#challenge-sidebar');
        if (oldSidebar) oldSidebar.remove();
        const sidebar = FUNC.elt('aside', 'challenge-sidebar', 'challenge-sidebar');
        sidebar.style.top = `${CONSTANTS.offsetY}px`;
        const panel = FUNC.elt('section', 'challenge-panel', 'challenge-panel');
        panel.setAttribute('aria-label', 'Challenge controls');

        const title = FUNC.elt('h2', 'challenge-title');
        title.innerText = 'Challenge';
        const status = FUNC.elt('p', 'challenge-status', 'challenge-status');
        status.setAttribute('aria-live', 'polite');
        const solvedBanner = FUNC.elt('div', 'challenge-solved-banner', 'challenge-solved-banner');
        solvedBanner.setAttribute('role', 'status');
        solvedBanner.innerHTML = '<span aria-hidden="true">✓</span> Solved!';
        solvedBanner.hidden = true;
        const navigation = FUNC.elt('nav', 'challenge-navigation');
        navigation.setAttribute('aria-label', 'Challenge collection');
        const filterRow = FUNC.elt('label', 'challenge-filter-row');
        filterRow.innerText = 'Filter by';
        const filter = FUNC.elt('select', 'challenge-filter', 'challenge-filter');
        [
            ['all', 'All difficulties'],
            ['easy', 'Easy'],
            ['medium', 'Medium'],
            ['hard', 'Hard'],
        ].forEach(([value, label]) => {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = label;
            filter.append(option);
        });
        filter.addEventListener('change', () => this.setDifficultyFilter(filter.value));
        filterRow.append(filter);
        const navigationHeader = FUNC.elt('div', 'challenge-navigation-header');
        const previousButton = FUNC.elt(
            'button',
            'challenge-navigation-button',
            'challenge-previous',
        );
        previousButton.type = 'button';
        previousButton.innerText = 'Previous';
        previousButton.disabled = true;
        previousButton.addEventListener('click', () => this.navigateRelative(-1));
        const position = FUNC.elt('span', 'challenge-position', 'challenge-position');
        position.innerText = '—';
        const nextButton = FUNC.elt(
            'button',
            'challenge-navigation-button',
            'challenge-next',
        );
        nextButton.type = 'button';
        nextButton.innerText = 'Next';
        nextButton.disabled = true;
        nextButton.addEventListener('click', () => this.navigateRelative(1));
        navigationHeader.append(previousButton, position, nextButton);
        const puzzleList = FUNC.elt('div', 'challenge-puzzle-list', 'challenge-puzzle-list');
        navigation.append(filterRow, navigationHeader, puzzleList);
        const difficulty = FUNC.elt('div', 'challenge-difficulty', 'challenge-difficulty');
        difficulty.setAttribute('aria-label', 'Puzzle difficulty');
        ['easy', 'medium', 'hard'].forEach(value => {
            const button = FUNC.elt('button', 'challenge-difficulty-button');
            button.type = 'button';
            button.dataset.difficulty = value;
            button.innerText = value[0].toUpperCase() + value.slice(1);
            button.addEventListener('click', () => this.setManualDifficulty(value));
            difficulty.append(button);
        });
        const controls = FUNC.elt('div', 'challenge-controls');
        const resetButton = FUNC.elt('button', 'challenge-control', 'challenge-reset');
        resetButton.type = 'button';
        resetButton.innerText = 'Reset';
        resetButton.addEventListener('click', () => this.restart());
        const solutionButton = FUNC.elt('button', 'challenge-control', 'challenge-solution');
        solutionButton.type = 'button';
        solutionButton.innerText = 'Show solution';
        solutionButton.addEventListener('click', () => this.showSolution());
        controls.append(resetButton, solutionButton);
        panel.append(title, status, solvedBanner, navigation, difficulty, controls);
        sidebar.append(panel, createThemePicker());
        document.querySelector('#wood-block-puzzle').append(sidebar);
        alignPieceTray();
    }

    bindBoardAnchors() {
        $boxes.getBoxes().forEach((row, rowIndex) => row.forEach((box, columnIndex) => {
            const element = box.getDiv();
            element.classList.add('challenge-anchor');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', `Board row ${rowIndex + 1}, column ${columnIndex + 1}`);
            element.tabIndex = 0;
            const place = () => this.placeSelected(rowIndex, columnIndex);
            element.addEventListener('click', place);
            activateWithKeyboard(element, place);
        }));
    }

    renderBoard(board = this.session.board) {
        $boxes.useLayout(challengeBoardLayout(board));
    }

    createShapePreview(shapeId) {
        const shape = challengeShapeView(shapeId);
        const preview = FUNC.elt('span', 'challenge-shape-preview');
        preview.style.width = `${shape.width * 21}px`;
        preview.style.height = `${shape.height * 21}px`;
        shape.cells.forEach(([row, column]) => {
            const cell = FUNC.elt('span', 'challenge-shape-cell');
            cell.style.left = `${column * 21}px`;
            cell.style.top = `${row * 21}px`;
            preview.append(cell);
        });
        return preview;
    }

    renderTray() {
        const tray = document.querySelector('#figures');
        tray.innerHTML = '';
        const state = this.session.getState();
        state.shapes.forEach((shapeId, shapeIndex) => {
            const available = state.remainingShapeIndices.includes(shapeIndex);
            const piece = FUNC.elt('button', 'challenge-piece');
            piece.type = 'button';
            piece.dataset.shapeIndex = String(shapeIndex);
            piece.setAttribute('aria-label', `${shapeId.replaceAll('_', ' ')}${available ? '' : ', used'}`);
            piece.disabled = !available || this.replaying || state.status !== 'active';
            piece.disabled = piece.disabled || this.animating;
            if (!available) piece.classList.add('challenge-piece-used');
            if (shapeIndex === this.selectedShapeIndex) piece.classList.add('challenge-piece-selected');
            piece.append(this.createShapePreview(shapeId));
            const label = FUNC.elt('span', 'challenge-piece-label');
            label.innerText = shapeId.replaceAll('_', ' ');
            piece.append(label);
            piece.addEventListener('click', event => {
                if (this.suppressClickShapeIndex === shapeIndex) {
                    this.suppressClickShapeIndex = null;
                    return;
                }
                if (piece.disabled) return;
                if (event.detail === 0) sound.play('pickup');
                this.selectedShapeIndex = shapeIndex;
                this.renderTray();
                this.setStatus('Piece selected. Choose its top-left anchor.', 'active');
            });
            piece.addEventListener('pointerdown', event => {
                this.startDrag(event, shapeIndex, piece);
            });
            tray.append(piece);
        });
    }

    render() {
        if (!this.session) return;
        this.renderBoard();
        this.renderTray();
    }

    renderNavigation() {
        const previous = document.querySelector('#challenge-previous');
        const next = document.querySelector('#challenge-next');
        const position = document.querySelector('#challenge-position');
        const list = document.querySelector('#challenge-puzzle-list');
        if (!previous || !next || !position || !list || this.collection.length === 0) return;
        const filtered = this.filteredIndices();
        const filteredPosition = filtered.indexOf(this.currentChallengeIndex);
        previous.disabled = filteredPosition <= 0;
        next.disabled = filteredPosition < 0 || filteredPosition === filtered.length - 1;
        position.innerText = filteredPosition < 0
            ? `0 of ${filtered.length}`
            : `${filteredPosition + 1} of ${filtered.length}`;
        list.innerHTML = '';
        filtered.forEach(index => {
            const challenge = this.collection[index];
            const button = FUNC.elt('button', 'challenge-puzzle-number');
            button.type = 'button';
            button.innerText = String(index + 1);
            button.title = challenge.id;
            button.setAttribute('aria-label', `Open puzzle ${index + 1}: ${challenge.id}`);
            if (this.progressFor(challenge.id).solved) {
                button.classList.add('challenge-puzzle-number-solved');
                button.setAttribute('aria-label', `${button.getAttribute('aria-label')}, solved`);
            }
            if (index === this.currentChallengeIndex) {
                button.classList.add('challenge-puzzle-number-active');
                button.setAttribute('aria-current', 'page');
            }
            button.addEventListener('click', () => this.activateChallenge(index));
            list.append(button);
        });
        const active = list.querySelector('[aria-current="page"]');
        if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    progressFor(puzzleId) {
        return this.progressById[puzzleId]
            || { solved: false, manualDifficulty: 'easy' };
    }

    filteredIndices() {
        return this.collection.reduce((indices, challenge, index) => {
            if (this.difficultyFilter === 'all'
                || this.progressFor(challenge.id).manualDifficulty === this.difficultyFilter) {
                indices.push(index);
            }
            return indices;
        }, []);
    }

    navigateRelative(offset) {
        const filtered = this.filteredIndices();
        const position = filtered.indexOf(this.currentChallengeIndex);
        const target = position + offset;
        if (position >= 0 && target >= 0 && target < filtered.length) {
            this.activateChallenge(filtered[target]);
        }
    }

    setDifficultyFilter(value) {
        if (!['all', 'easy', 'medium', 'hard'].includes(value)) return;
        this.difficultyFilter = value;
        const filtered = this.filteredIndices();
        if (filtered.length > 0 && !filtered.includes(this.currentChallengeIndex)) {
            this.activateChallenge(filtered[0]);
            return;
        }
        this.renderNavigation();
        if (filtered.length === 0) {
            this.setStatus(`No ${value} puzzles yet. You can assign the current puzzle below.`, 'warning');
        }
    }

    renderDifficulty() {
        if (!this.loadedChallenge) return;
        const selected = this.progressFor(this.loadedChallenge.id).manualDifficulty;
        document.querySelectorAll('.challenge-difficulty-button').forEach(button => {
            const active = button.dataset.difficulty === selected;
            button.classList.toggle('challenge-difficulty-button-active', active);
            button.setAttribute('aria-pressed', String(active));
            button.disabled = false;
        });
    }

    async setManualDifficulty(value) {
        if (!this.loadedChallenge || !['easy', 'medium', 'hard'].includes(value)) return;
        const puzzleId = this.loadedChallenge.id;
        const previous = this.progressFor(puzzleId);
        if (previous.manualDifficulty === value) return;
        document.querySelectorAll('.challenge-difficulty-button')
            .forEach(button => { button.disabled = true; });
        try {
            const saved = await saveChallengeProgress(puzzleId, { manualDifficulty: value });
            this.progressById[puzzleId] = saved;
            if (!this.loadedChallenge || this.loadedChallenge.id !== puzzleId) return;
            this.renderDifficulty();
            const filtered = this.filteredIndices();
            if (filtered.length > 0 && !filtered.includes(this.currentChallengeIndex)) {
                const next = filtered.find(index => index > this.currentChallengeIndex);
                this.activateChallenge(next === undefined ? filtered[0] : next);
                return;
            }
            this.renderNavigation();
            this.setStatus(`Marked ${value}.`, 'active');
        } catch (error) {
            this.renderDifficulty();
            this.setStatus(error.message, 'error');
        }
    }

    activateChallenge(index) {
        if (!Number.isSafeInteger(index) || index < 0 || index >= this.collection.length) return;
        this.cancelDrag();
        this.interactionToken++;
        this.replayToken++;
        this.replaying = false;
        this.animating = false;
        this.selectedShapeIndex = null;
        this.currentChallengeIndex = index;
        this.loadedChallenge = this.collection[index];
        this.session = new ChallengeSession(this.loadedChallenge);
        this.invalidAttemptCount = 0;
        this.hintsUsed = 0;
        this.startedAt = Date.now();
        this.render();
        this.renderNavigation();
        this.renderDifficulty();
        this.showSolvedBanner(false);
        this.setControlsDisabled(false);
        this.setStatus(
            `Puzzle ${index + 1} of ${this.collection.length}. Drag a piece onto the board, or select it and choose an anchor.`,
            'active',
        );
    }

    placeSelected(row, column) {
        if (!this.session || this.replaying || this.animating) return;
        if (this.selectedShapeIndex === null) {
            this.setStatus('Select a tray piece first.', 'warning');
            return;
        }
        this.placeShape(this.selectedShapeIndex, row, column);
    }

    rejectionMessage(reason) {
        const messages = {
            OUT_OF_BOUNDS: 'That piece would extend beyond the board.',
            OVERLAP: 'That placement overlaps occupied cells.',
            SHAPE_ALREADY_USED: 'That piece has already been used.',
            SESSION_TERMINAL: 'Reset the challenge to play again.',
        };
        return messages[reason] || 'That placement is not legal.';
    }

    async placeShape(shapeIndex, row, column) {
        if (!this.session || this.replaying || this.animating) return;
        const result = this.session.place(shapeIndex, row, column);
        if (!result.accepted) {
            this.invalidAttemptCount++;
            this.setStatus(this.rejectionMessage(result.reason), 'warning');
            return;
        }
        this.selectedShapeIndex = null;
        const token = ++this.interactionToken;
        sound.play('drop');
        this.animating = true;
        this.renderBoard(result.transition.placedBoard);
        this.renderTray();
        this.animatePlacedCells(result.move);
        this.setStatus('Placing piece…', 'active');
        await delay(360);
        if (token !== this.interactionToken) return;
        if (result.transition.clearedRows.length > 0
            || result.transition.clearedColumns.length > 0) {
            const animations = this.animateClearedCells(result.transition);
            this.renderBoard(result.transition.boardAfter);
            await Promise.all(animations);
            if (token !== this.interactionToken) return;
        } else {
            this.renderBoard(result.transition.boardAfter);
        }
        this.animating = false;
        this.renderTray();
        if (result.state.status === 'won') {
            this.emitOutcome(true);
            await this.completePuzzle(token);
        } else if (result.state.status === 'lost') {
            this.setStatus('No remaining piece can be placed. Try resetting.', 'lost');
            this.emitOutcome(false);
        } else {
            const cleared = result.transition.clearedRows.length
                + result.transition.clearedColumns.length;
            this.setStatus(cleared ? `Placed — cleared ${cleared} line${cleared === 1 ? '' : 's'}.` : 'Placed successfully.', 'active');
        }
    }

    boardGeometry() {
        const first = $boxes.get(0, 0).getDiv().getBoundingClientRect();
        const nextColumn = $boxes.get(0, 1).getDiv().getBoundingClientRect();
        const nextRow = $boxes.get(1, 0).getDiv().getBoundingClientRect();
        return {
            left: first.left,
            top: first.top,
            columnStep: nextColumn.left - first.left,
            rowStep: nextRow.top - first.top,
            cellWidth: first.width,
            cellHeight: first.height,
        };
    }

    createDragGhost(shape, geometry) {
        const ghost = FUNC.elt('div', 'challenge-drag-ghost');
        ghost.style.width = `${shape.width * geometry.columnStep}px`;
        ghost.style.height = `${shape.height * geometry.rowStep}px`;
        shape.cells.forEach(([row, column]) => {
            const cell = FUNC.elt('span', 'challenge-drag-cell');
            cell.style.left = `${column * geometry.columnStep}px`;
            cell.style.top = `${row * geometry.rowStep}px`;
            cell.style.width = `${geometry.cellWidth}px`;
            cell.style.height = `${geometry.cellHeight}px`;
            ghost.append(cell);
        });
        document.body.append(ghost);
        return ghost;
    }

    clearDropPreview() {
        document.querySelectorAll(
            '.challenge-drop-preview-valid, .challenge-drop-preview-invalid',
        ).forEach(element => element.classList.remove(
            'challenge-drop-preview-valid',
            'challenge-drop-preview-invalid',
        ));
    }

    dragCandidate(event, drag) {
        const ghostLeft = event.clientX - drag.shape.width * drag.geometry.columnStep / 2;
        const ghostTop = event.clientY - drag.shape.height * drag.geometry.rowStep - 22;
        drag.ghost.style.left = `${ghostLeft}px`;
        drag.ghost.style.top = `${ghostTop}px`;
        const column = Math.round((ghostLeft - drag.geometry.left) / drag.geometry.columnStep);
        const row = Math.round((ghostTop - drag.geometry.top) / drag.geometry.rowStep);
        drag.shape.cells.forEach(([rowOffset], index) => {
            applyOceanDepth(drag.ghost.children[index], row + rowOffset);
        });
        let legal = false;
        let reason = 'OUT_OF_BOUNDS';
        try {
            const placement = getPlacement(drag.shape.id, row, column);
            legal = isLegalPlacement(this.session.board, placement);
            reason = legal ? null : 'OVERLAP';
        } catch (_error) {
            legal = false;
        }
        return { row, column, legal, reason };
    }

    renderDropPreview(drag, candidate) {
        this.clearDropPreview();
        drag.ghost.classList.toggle('challenge-drag-ghost-valid', candidate.legal);
        drag.ghost.classList.toggle('challenge-drag-ghost-invalid', !candidate.legal);
        drag.shape.cells.forEach(([rowOffset, columnOffset]) => {
            const row = candidate.row + rowOffset;
            const column = candidate.column + columnOffset;
            if (row < 0 || row >= 8 || column < 0 || column >= 8) return;
            $boxes.get(row, column).getDiv().classList.add(
                candidate.legal
                    ? 'challenge-drop-preview-valid'
                    : 'challenge-drop-preview-invalid',
            );
        });
    }

    startDrag(event, shapeIndex, piece) {
        if (piece.disabled || this.dragState || this.animating || this.replaying) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        event.preventDefault();
        sound.play('pickup');
        const shape = challengeShapeView(this.session.shapes[shapeIndex]);
        const geometry = this.boardGeometry();
        const drag = {
            pointerId: event.pointerId,
            shapeIndex,
            shape,
            geometry,
            ghost: this.createDragGhost(shape, geometry),
            piece,
            startX: event.clientX,
            startY: event.clientY,
            moved: false,
            candidate: null,
        };
        const move = moveEvent => {
            if (moveEvent.pointerId !== drag.pointerId) return;
            moveEvent.preventDefault();
            if (Math.hypot(
                moveEvent.clientX - drag.startX,
                moveEvent.clientY - drag.startY,
            ) > 4) drag.moved = true;
            drag.candidate = this.dragCandidate(moveEvent, drag);
            this.renderDropPreview(drag, drag.candidate);
        };
        const finish = finishEvent => {
            if (finishEvent.pointerId !== drag.pointerId) return;
            finishEvent.preventDefault();
            const cancelled = finishEvent.type === 'pointercancel';
            const candidate = drag.candidate;
            const moved = drag.moved;
            this.cancelDrag();
            if (!moved) return;
            this.suppressClickShapeIndex = shapeIndex;
            if (!cancelled && candidate && candidate.legal) {
                this.placeShape(shapeIndex, candidate.row, candidate.column);
            } else if (!cancelled) {
                this.invalidAttemptCount++;
                this.setStatus(this.rejectionMessage(candidate && candidate.reason), 'warning');
            }
        };
        drag.cleanup = () => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', finish);
            document.removeEventListener('pointercancel', finish);
        };
        this.dragState = drag;
        piece.classList.add('challenge-piece-dragging');
        document.addEventListener('pointermove', move, { passive: false });
        document.addEventListener('pointerup', finish, { passive: false });
        document.addEventListener('pointercancel', finish, { passive: false });
        move(event);
    }

    cancelDrag() {
        if (!this.dragState) return;
        this.dragState.cleanup();
        this.dragState.ghost.remove();
        this.dragState.piece.classList.remove('challenge-piece-dragging');
        this.dragState = null;
        this.clearDropPreview();
    }

    animatePlacedCells(move) {
        const shape = challengeShapeView(move.shapeId);
        shape.cells.forEach(([rowOffset, columnOffset]) => {
            const element = $boxes.get(
                move.row + rowOffset,
                move.column + columnOffset,
            ).getDiv();
            element.classList.remove('challenge-placement-pulse');
            void element.offsetWidth;
            element.classList.add('challenge-placement-pulse');
        });
    }

    animateClearedCells(transition) {
        if (transition.clearedRows.length || transition.clearedColumns.length) {
            sound.play('clear', document.documentElement.dataset.blockTheme);
        }
        const coordinates = new Set();
        transition.clearedRows.forEach(row => {
            for (let column = 0; column < 8; column++) coordinates.add(`${row},${column}`);
        });
        transition.clearedColumns.forEach(column => {
            for (let row = 0; row < 8; row++) coordinates.add(`${row},${column}`);
        });
        return [...coordinates].map((coordinate, index) => {
            const [row, column] = coordinate.split(',').map(Number);
            return $blockCrashAnimation.animateCrash(
                $boxes.get(row, column),
                { delay: (index % 8) * 42 },
            );
        });
    }

    setStatus(message, state) {
        const status = document.querySelector('#challenge-status');
        if (!status) return;
        status.innerText = message;
        status.dataset.state = state;
    }

    showSolvedBanner(visible) {
        const banner = document.querySelector('#challenge-solved-banner');
        if (!banner) return;
        banner.hidden = !visible;
        if (visible) {
            banner.classList.remove('challenge-solved-banner-visible');
            void banner.offsetWidth;
            banner.classList.add('challenge-solved-banner-visible');
        }
    }

    async completePuzzle(token) {
        const puzzleId = this.loadedChallenge.id;
        this.showSolvedBanner(true);
        this.setStatus('Excellent — all three pieces placed.', 'won');
        try {
            const saved = await saveChallengeProgress(puzzleId, { solved: true });
            if (token !== this.interactionToken || this.loadedChallenge.id !== puzzleId) return;
            this.progressById[puzzleId] = saved;
            this.renderNavigation();
            await delay(1200);
            if (token !== this.interactionToken || this.loadedChallenge.id !== puzzleId) return;
            const filtered = this.filteredIndices();
            const position = filtered.indexOf(this.currentChallengeIndex);
            if (position >= 0 && position + 1 < filtered.length) {
                this.activateChallenge(filtered[position + 1]);
            }
        } catch (error) {
            if (token !== this.interactionToken) return;
            this.setStatus(`Solved, but progress was not saved: ${error.message}`, 'error');
        }
    }

    setControlsDisabled(disabled) {
        document.querySelectorAll('.challenge-piece, .challenge-control')
            .forEach(element => { element.disabled = disabled; });
    }

    async showSolution() {
        if (!this.session || this.replaying) return;
        this.cancelDrag();
        this.interactionToken++;
        this.replaying = true;
        this.hintsUsed++;
        const token = ++this.replayToken;
        this.selectedShapeIndex = null;
        this.renderTray();
        this.setControlsDisabled(true);
        this.renderBoard(this.session.initialBoard);
        this.setStatus('Showing stored solution…', 'replay');
        const frames = this.session.replayStoredSolution();
        for (const frame of frames) {
            await delay(650);
            if (token !== this.replayToken) return;
            this.renderBoard(frame.boardAfter);
        }
        this.replaying = false;
        this.renderTray();
        this.setControlsDisabled(true);
        const resetButton = document.querySelector('#challenge-reset');
        if (resetButton) resetButton.disabled = false;
        this.setStatus('Solution shown. Reset when you are ready to try.', 'replay');
    }

    reset() {
        this.cancelDrag();
        this.interactionToken++;
        this.replayToken++;
        this.replaying = false;
        this.animating = false;
        this.selectedShapeIndex = null;
        this.invalidAttemptCount = 0;
        this.hintsUsed = 0;
        this.startedAt = Date.now();
        if (this.session) this.session.reset();
    }

    emitOutcome(completed) {
        if (!this.loadedChallenge || !this.loadedChallenge.difficulty) return;
        const outcome = createPlayerOutcome({
            puzzleId: this.loadedChallenge.id,
            difficulty: this.loadedChallenge.difficulty,
            completed,
            acceptedMoveCount: this.session.history.length,
            invalidAttemptCount: this.invalidAttemptCount,
            hintsUsed: this.hintsUsed,
            durationSeconds: this.startedAt === null
                ? null : (Date.now() - this.startedAt) / 1000,
        });
        window.dispatchEvent(new CustomEvent('wood-block-challenge-outcome', {
            detail: outcome,
        }));
    }

    restart() {
        if (!this.session) return;
        this.reset();
        this.render();
        this.showSolvedBanner(false);
        this.setControlsDisabled(false);
        this.setStatus('Drag a piece onto the board, or select it and choose an anchor.', 'active');
    }

    lose() {
        this.setStatus('Challenge lost.', 'lost');
    }
}
