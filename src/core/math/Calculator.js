import CONSTANTS from "../../general/Constants";
import FUNC from "../../general/Custom";

export default class Calculator {
    /**
     *
     * @param $parentMatrix {Array[]}
     * @param $childMatrix {Array[]}
     * @param x {Number} starting x-index in `$parentMatrix`
     * @param y {Number} staring y-index in `$parentMatrix`
     */
    static isMatrixMatch($parentMatrix, $childMatrix, { x, y }) {
        let isMatch = true;
        $childMatrix.forEach((row, i) => {
            if (!isMatch) return false;
            row.forEach((cell, j) => {
                if (Calculator.isset($childMatrix, i, j)) {
                    if (Calculator.isset($parentMatrix, x + i, y + j)) {
                        isMatch = false;
                        return false;
                    }
                    if (x + i >= CONSTANTS.boxesOnRow || y + j >= CONSTANTS.boxesOnColumn) {
                        isMatch = false;
                        return false;
                    }
                }
            })
        });
        return isMatch;
    }

    static isMatrixMatchForAny($parentMatrix, $childMatrix) {
        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            for (let j = 0; j < CONSTANTS.boxesOnColumn; j++) {
                const ok = Calculator.isMatrixMatch($parentMatrix, $childMatrix, { x: i, y: j });
                if (ok) {
                    return true;
                }
            }
        }

        return false;
    }

    static isset($array, $i, $j) {
        if (!$array[$i]) {
            return false
        }

        if (!$array[$i][$j]) {
            return false;
        }

        return $array[$i][$j] === 1;
    }

    /**
     * @param $string {String} such as `10111101010101010`
     * @param $int {Number} such as `15, 254, 3033`
     * @param $category {Number}
     * @param $partSize {Number}
     */
    static matchesIntToStringPattern($string, $int, $category = CONSTANTS.boxesOnRow,  $partSize = CONSTANTS.boxesOnRow * 3) {
        return Calculator.matchesIntToStringPatternFrom($string, $int, { x: 0, y: 0 }, $category, $partSize);
    }

    /**
     *
     * @param $string {String}
     * @param $int {Number}
     * @param x {Number}
     * @param y {Number}
     * @param $category {Number}
     * @param $partSize {Number}
     */
    static matchesIntToStringPatternFrom($string, $int, { x, y }, $category,  $partSize = CONSTANTS.boxesOnRow * 3) {
        const startingIndex = x * CONSTANTS.boxesOnRow + y;

        // console.log(x, y, $category);

        let number = 0;
        for (let i = startingIndex; i < $partSize; i++) {
            if ($string[i] === undefined) {
                return false;
            }

            const char = $string[i];
            if (char === '1') {
                number += FUNC.power(i - startingIndex);
            }
        }

        function isMatch() {
            const matches = number & $int;
            return matches === $int;
        }

        let currentCategory = x;
        const maxCategory = CONSTANTS.boxesOnRow - $category + 1;

        if ((currentCategory < maxCategory) && isMatch()) {
            return true;
        }

        const power2to3xBoxesOnRow = FUNC.power(CONSTANTS.boxesOnRow * 3);
        for (let i = startingIndex + 1; i < $string.length; i++) {
            number /= 2;
            number = Math.floor(number);

            const char = $string[i];
            if (char === '1') {
                number += power2to3xBoxesOnRow;
            }

            if (currentCategory === CONSTANTS.boxesOnRow - 1) {
                currentCategory = 0;
            }

            if (currentCategory++ >= maxCategory) {
                continue;
            }

            if (isMatch()) {
                return true;
            }
        }

        return false;
    }
}

