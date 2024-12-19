import { ElementTypes } from "../../SimpleOverlays"
import { BossBarElement } from "./BossBarElement"
import { DataTextElement } from "./DataTextElement"
import { TimedTextElement } from "./TimedTextElement"

export default Object.assign(ElementTypes, {
    BossBar: BossBarElement,
    TimedText: TimedTextElement,
    DataText: DataTextElement,
})