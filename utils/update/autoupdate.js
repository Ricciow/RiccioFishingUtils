import settings from "../settings";
import { updateModule } from "./updatechecker";

if(settings().autoUpdate) {
    updateModule()
}