import FUNC from "../Custom";
import $game from "../Game";
import {GAME_TYPE_BUILD_UP, GAME_TYPE_COMPETE, GAME_TYPE_RELAX} from "../game_types/Constants";

export default class Menu {
    static show() {
        FUNC.$('#backdrop').className = 'fallDown'
    }

    static hide() {
        FUNC.$('#backdrop').className = 'fallUp'
    }

    static init() {
        const toSpace = str => str.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
        const ucf = str => str.charAt(0).toUpperCase() + str.slice(1);

        [GAME_TYPE_RELAX, GAME_TYPE_COMPETE, GAME_TYPE_BUILD_UP].forEach(mode => {
            let mainDiv = FUNC.elt('div', 'menu-button')

            mainDiv.innerHTML = `
                      <div class='inner-button'>
                         <div class='button-background'>
                            <div style='display:flex'>
                               <div class='circle'></div>
                               <span class='text'>
                                   ${ucf(toSpace(mode))}
                               </span>
                            </div>
                         </div>
                   </div>
                   `

            mainDiv.addEventListener('click', (e) => {
                Menu.hide()
                $game.init(mode)
                $game.start()
            })

            FUNC.$('.menu-buttons').append(mainDiv)
        })
    }
}