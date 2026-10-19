import Menu from "./general/menu/Menu";
import { applyBlockTheme, loadBlockTheme } from './puzzle/theme';

applyBlockTheme(loadBlockTheme(), { persist: false });
Menu.init()


