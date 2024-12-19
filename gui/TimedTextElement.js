import { BaseElement } from "../../SimpleOverlays/elements/baseElement"
import { UICTText } from "../../SimpleOverlays/utils"
import { readableTime } from "../utils/functions"

export class TimedTextElement extends BaseElement {

    /**
     * 
     * @param {str} key
     * @param {float} X 
     * @param {float} Y 
     * @param {float} width 
     * @param {float} height 
     * @param {str} scalingMode Y for vertical, X for horizontal, BOTH for both, NONE for no scaling
     * @param {any} data
     * @param {GuiManager} manager The GuiManager Object
     */
    constructor(key = "", enabled = true, X = 0, Y = 0, width = 20, height = 20, scale = 1, scalingMode = 'Y', data, manager) {

        //Due to the Nature of this Element, scalingMode will forced to Y
        super(key, enabled = true, X, Y, width, height, scale, "Y", data, manager)

        //! Constant that must be changed when making custom elements
        this.type = "TimedText"

        this.moveOpen = false

        //Making a custom UIText with Chattrigger's drawing functionalities
        this.textElement = UICTText(this.data.Text)
        .setHeight((100).percent())
        .setChildOf(this.boundingBox)
    }

    onDraw() {
        if(!this.moveOpen && this.data.Hidden) {
            this.textElement.setText("")
        }
        else {
            let text = this.data.Text
            if(this.moveOpen) {
                text = ((this.data.Text === "") ? this.data.Placeholder : this.data.Text)
            }
            Object.keys(this.data.Times).forEach((replacer) => {
                if(typeof this.data.Times[replacer] === "object") {
                    text = text.replace(replacer, this.data.Times[replacer][0])
                }
                else {
                    text = text.replace(replacer, readableTime(Math.abs(Date.now() - this.data.Times[replacer])))
                }
            })
            this.textElement.setText(text)
        }
    }

    setData(data) {
        super.setData(data)
        this.onDraw()
    }

    open() {
        this.moveOpen = true
        this.onDraw()
        super.open()
    }

    close() {
        this.moveOpen = false
        this.onDraw()
        super.close()
    }
}

// data = {
//     "Text": "Blablabla (1) Blablabla (2)",
//     "Hidden": false,
//     "Placeholder": "Blablabla2"
//     "Times": {
//         "(1)": 1002412024,
//         "(2)": 1024010241
//     }
// }