import CONSTANTS from "../../../../general/Constants";
import FUNC from "../../../../general/Custom";

export default class Figure {
    /**
     * @param name {string}
     * @param pattern {string}
     */
    constructor(name, pattern) {
        this.name = name;

        this.pattern = Figure.normalize(pattern);

        this.matrix = this.pattern.map(row => {
            return row.map(cell => {
                return cell === '.'
                    ? 0
                    : 1
            })
        });
    }

    /**
     * @param pattern {String}
     * @return {(*|string[])[]}
     */
    static normalize(pattern) {
        return pattern.split("\n")
            .map(c => c.trim())
            .filter(c => c)
            .map(c => c.split(""))
    }

    isset(i, j) {
        return this.pattern[i] && this.pattern[i][j] && this.pattern[i][j] !== '.';
    }

    toString() {
        throw new DOMException('Figure toString() method is not implemented');
    }

    toMatrix() {
        return this.matrix;
    }

    toInt() {
        const rowCount = CONSTANTS.boxesOnRow;
        let result = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < rowCount; j++) {
                if (this.isset(i, j)) {
                    result += FUNC.power(i * rowCount + j);
                }
            }
        }

        return result;
    }

    /**
     * returns max number blocks on X-axis
     */
    getCategory() {
       let result = 0;
       this.pattern.forEach(arr => result = Math.max(result, arr.length));
       return result;
    }
}