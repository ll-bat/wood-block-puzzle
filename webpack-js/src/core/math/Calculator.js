import CONSTANTS from "../../general/Constants";
import FUNC from "../../general/Custom";

export default class Calculator {
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

        console.log(x, y, $category);

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

        if (currentCategory < maxCategory && isMatch()) {
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

