import settings from "../../settings/settings";
import { updateModule } from "./updatechecker";

if(settings().autoUpdate) {
    updateModule()
}