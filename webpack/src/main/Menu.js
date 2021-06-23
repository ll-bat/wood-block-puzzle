import { $, elt } from '../shared/custom'
import game from './game'

export default class Menu {
    static show() {
        $('backdrop').className = 'fallDown'
    }

    static hide() {
        $('backdrop').className = 'fallUp'
    }

    static init() {
        ['start', 'options', 'upgrade', 'about'].forEach(button => {
            let mainDiv = elt('div', 'menu-button')

            let result = `
                      <div class='inner-button'>
                         <div class='button-background'>
                            <div style='display:flex'>
                               <div class='circle'></div>
                               <span class='text'>
                                   ${button}
                               </span>
                            </div>
                         </div>
                   </div>
                   `
            mainDiv.innerHTML = result

            mainDiv.addEventListener('click', (e) => {
                game.start()
            })

            $('menu-buttons').append(mainDiv)
        })
    }
}