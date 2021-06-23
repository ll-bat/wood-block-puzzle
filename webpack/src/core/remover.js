 import { boxesOnRow, boxesOnColumn } from '../shared/constants'
 import { setStyle } from '../shared/custom'
 import boxes from '../shared/store/boxes'
 import score from '../main/score'
 import blockAnim from './BlockCrashAnimation'

 class Remover {
     constructor() {
         this.onRow = []
         this.onColumn = []
     }

     update({ x, y }) {
         if (this.onColumn[y]) {
             this.onColumn[y]++;
         } else {
             this.onColumn[y] = 1;
         }

         if (this.onRow[x]) {
             this.onRow[x]++;
         } else {
             this.onRow[x] = 1;
         }

         boxes.array[x][y].busy = true;
     }

     cleanUp() {
         let removedColumns = 0;
         let isRemoved = false;

         for (let i = 0; i < boxesOnColumn; i++) {
             if (this.onColumn[i] === boxesOnColumn) {
                 this.remove(i, boxesOnRow, 'row');
                 removedColumns++;
                 this.onColumn[i] = 0;
                 if (!isRemoved) isRemoved = true;
             }
         }

         for (let i = 0; i < boxesOnRow; i++) {
             if (this.onRow[i] === boxesOnRow) {
                 this.remove(i, boxesOnColumn, 'column', (i) => {
                     if (this.onColumn[i]) {
                         this.onColumn[i]--;
                     }
                 })
                 this.onRow[i] = 0;
                 if (!isRemoved) isRemoved = true;
             } else {
                 this.onRow[i] -= removedColumns;
             }
         }

         if (isRemoved) score.update(50)
             // console.log("column", this.onColumn);
             // console.log("row", this.onRow);
     }

     remove(a, b, type, fn) {
         for (let i = 0; i < b; i++) {
             let box = boxes.array[i][a];
             if (type === 'column') box = boxes.array[a][i];

             if (fn) fn(i);

             if (!box.busy) continue;
             box.busy = false;

             // setStyle(box.div, {
             //    background: blockCrashColor,
             // })

             setTimeout(() => {
                 blockAnim.animateCrash(box)

                 setStyle(box.div, {
                     background: '#1E1E1E',
                     border: '2px solid black'
                 })

             }, 20)
         }
     }

     reset() {
         this.onColumn = [];
         this.onRow = [];
     }

 }

 const remover = new Remover();
 export default remover;