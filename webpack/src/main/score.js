import { $ } from '../shared/custom'

class Score {
    constructor() {
        this.score = 0;
        this.maxScore = 0;
    }

    async update(score = 15) {
        const num = Math.floor(Math.random() * score) + 7
        const parts = Math.floor(Math.random() * 7)

        this.score += num;

        for (let i = 0; i < parts; i++) {
            await this.add(Math.floor(num / parts))
        }
    }

    add(cnt) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                let score = $('score').innerText
                score = parseInt(score)
                score += cnt
                $('score').innerText = score.toString()
                res()
            }, 70)
        })
    }

    reset() {
        this.score = 0;
        $('score').innerText = '0';
        this.maxScore = this.getMaxScore();
        $('max-score').innerText = this.maxScore;
    }

    getMaxScore() {
        let score = !!localStorage.getItem('max-score') ? localStorage.getItem('max-score') : 0;
        return score.toString();
    }

    updateMaxScore() {
        if (this.score > this.maxScore) {
            localStorage.setItem('max-score', this.score)
        }
    }
}

const score = new Score();
export default score;