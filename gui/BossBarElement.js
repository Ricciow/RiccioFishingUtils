import { AdditiveConstraint, CenterConstraint, FillConstraint, SiblingConstraint, SubtractiveConstraint, TextAspectConstraint, UIContainer, UIRoundedRectangle, UIText } from "../../Elementa"
import { Color } from "../../SimpleOverlays/constants"
//@ts-ignore
import { BaseElement } from "../../SimpleOverlays/elements/BaseElement"

const TempBars = [
    {
        "Name":"§lPlhlegblast",
        "HPLabel": "§l100M/100M❤",
        "HPPercentage": 93,
        "ColorScheme": {
            "Text": [0.7, 0, 0, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [0.7, 0, 0, 1]
        }
    },
    {
        "Name":"§lJawbus",
        "HPLabel": "§l100M/100M❤",
        "HPPercentage": 80,
        "ColorScheme": {
            "Text": [1, 0, 0, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [1, 0, 0, 1]
        }
    },
    {
        "Name":"§lThunder",
        "HPLabel": "§l100M/100M❤",
        "HPPercentage": 37,
        "ColorScheme": {
            "Text": [0.4, 1, 1, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [0.4, 1, 1, 1]
        }
    }
]

export class BossBarElement extends BaseElement {
    /**
     * Makes a boss bar
     * @param {str} key
     * @param {float} X 
     * @param {float} Y 
     * @param {float} width 
     * @param {float} height 
     * @param {str} scalingMode Y for vertical, X for horizontal, BOTH for both, NONE for no scaling
     * @param {Object|Item} data 
     * @param {GuiManager} manager The GuiManager Object
     */
    constructor(key = "", enabled = true, X = 0, Y = 0, width = 20, height = 20, scale = 1, scalingMode = 'BOTH', data, manager) {
        super(key, enabled = true, X, Y, width, height, scale, "X", data, manager)

        this.type = "BossBar"

        this.bars = []
        this.spacers = []
        this.tempBars = false

        this.loadData()
    }

    reloadData() {
        let allStuff = this.bars.concat(this.spacers)
        allStuff.forEach((element) => {
            element.getParent().removeChild(element)
        })
        this.loadData()
    }

    loadData() {
        this.data.forEach((data) => {this.createBossBar(data)})
    }

    createBossBar(barData) {
        const barContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new SiblingConstraint)
        .setWidth((this.width * this.scale).pixels())
        .setHeight((this.height * this.scale).pixels())
        .setChildOf(this.boundingBox)

        const name = new UIText(barData.Name)
        .setX(new SiblingConstraint)
        .setY(new CenterConstraint)
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setColor(new Color(barData.ColorScheme.Text[0], barData.ColorScheme.Text[1], barData.ColorScheme.Text[2], barData.ColorScheme.Text[3]))
        .setChildOf(barContainer)

        const bar = new UIRoundedRectangle(5)
        .setX(new AdditiveConstraint(new SiblingConstraint, (1).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint(new FillConstraint, (2).pixels()))
        .setHeight((100).percent())
        .setColor(new Color(barData.ColorScheme.BgBar[0], barData.ColorScheme.BgBar[1], barData.ColorScheme.BgBar[2], barData.ColorScheme.BgBar[3]))
        .setChildOf(barContainer)

        const healthBarContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY((1).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setChildOf(bar)

        const healthBar = new UIRoundedRectangle(5)
        .setX((0).pixels())
        .setY(new CenterConstraint)
        .setWidth((barData.HPPercentage).percent())
        .setHeight((100).percent())
        .setColor(new Color(barData.ColorScheme.FgBar[0], barData.ColorScheme.FgBar[1], barData.ColorScheme.FgBar[2], barData.ColorScheme.FgBar[3]))
        .setChildOf(healthBarContainer)

        const hp = new UIText(barData.HPLabel)
        .setX(new AdditiveConstraint(new SiblingConstraint, (1).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setColor(new Color(barData.ColorScheme.Text[0], barData.ColorScheme.Text[1], barData.ColorScheme.Text[2], barData.ColorScheme.Text[3]))
        .setChildOf(barContainer)

        const spacer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new SiblingConstraint)
        .setWidth((this.width * this.scale).pixels())
        .setHeight((4 * this.scale).pixels())
        .setChildOf(this.boundingBox)

        this.bars.push(barContainer)
        this.spacers.push(spacer)
    }

    updateState(updateData = false) {
        this.reloadData()
        super.updateState(updateData)
    }

    updateWidth() {
        this.bars.forEach((bar) => {
            bar
            .setWidth((this.width * this.scale).pixels())
            .setHeight((this.height * this.scale).pixels())
        })

        this.spacers.forEach((spacer) => {
            spacer
            .setWidth((this.width * this.scale).pixels())
            .setHeight((4 * this.scale).pixels())
        })

        super.updateWidth()
    }

    setData(data) {
        if(this.tempBars) {
            if(data.length == 0) {
                super.setData(TempBars)
            }
            else {
                super.setData(data)
            }
        }
        else {
            super.setData(data)
        }
        this.reloadData()
    }

    open() {
        this.tempBars = true
        if(this.data.length == 0) {
            this.setData(TempBars)
        }
        super.open()
    }

    close() {
        this.tempBars = false
        if(this.data == TempBars) {
            this.setData([])
        }
        super.close()
    }
}