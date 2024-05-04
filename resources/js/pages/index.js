import { initPopup } from "../common/popup";
import { initHeader } from "../blocks/header/header";
import { initTelInput } from "../blocks/input/input";
import { initSpoilerWrap } from "../blocks/spoiler-wrap/spoiler-wrap";
import { handleCallBackForm } from "../api/callback-popup";
import { handleAuthPopup } from "../api/auth-popup";

initPopup(".popup--consultation", ".js-popup-consultation");
initPopup(".popup--city", ".js-popup-city");
initHeader();
initTelInput();
initSpoilerWrap();
handleCallBackForm();
handleAuthPopup();
