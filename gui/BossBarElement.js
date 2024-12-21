import { AdditiveConstraint, CenterConstraint, FillConstraint, SiblingConstraint, SubtractiveConstraint, TextAspectConstraint, UIContainer, UIRoundedRectangle, UIText } from "../../Elementa"
import { Color } from "../../SimpleOverlays/constants"
//@ts-ignore
import { BaseElement } from "../../SimpleOverlays/elements/BaseElement"

const TempBars = [
    {
        "Name":"§lPlhlegblast",
        "HPLabel": "§l465M/500M❤",
        "HPPercentage": 93,
        "ColorScheme": {
            "Text": [0.7, 0, 0, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [0.7, 0, 0, 1]
        }
    },
    {
        "Name":"§lJawbus",
        "HPLabel": "§l80M/100M❤",
        "HPPercentage": 80,
        "ColorScheme": {
            "Text": [1, 0, 0, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [1, 0, 0, 1]
        }
    },
    {
        "Name":"§lThunder",
        "HPLabel": "§l13M/35M❤",
        "HPPercentage": 37,
        "ColorScheme": {
            "Text": [0.4, 1, 1, 1],
            "BgBar": [0, 0, 0, 1],
            "FgBar": [0.4, 1, 1, 1]
        }
    }
]

class HealthBar {
    constructor(boundingBox, width, height, scale) {
        this.boundingBox = boundingBox
        this.width = width
        this.height = height
        this.scale = scale
        this.data = undefined
        this.hidden = false

        this.barContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new SiblingConstraint)
        .setWidth((this.width * this.scale).pixels())
        .setHeight((this.height * this.scale).pixels())
        .setChildOf(this.boundingBox)

        this.name = new UIText()
        .setX(new SiblingConstraint)
        .setY(new CenterConstraint)
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(this.barContainer)

        this.bar = new UIRoundedRectangle(5)
        .setX(new AdditiveConstraint(new SiblingConstraint, (1).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new SubtractiveConstraint(new FillConstraint, (2).pixels()))
        .setHeight((100).percent())
        .setChildOf(this.barContainer)

        const healthBarContainer = new UIContainer()
        .setX(new CenterConstraint)
        .setY((1).pixels())
        .setWidth(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setHeight(new SubtractiveConstraint((100).percent(), (2).pixels()))
        .setChildOf(this.bar)

        this.healthBar = new UIRoundedRectangle(5)
        .setX((0).pixels())
        .setY(new CenterConstraint)
        .setHeight((100).percent())
        .setChildOf(healthBarContainer)

        this.hp = new UIText()
        .setX(new AdditiveConstraint(new SiblingConstraint, (1).pixels()))
        .setY(new CenterConstraint)
        .setWidth(new TextAspectConstraint)
        .setHeight((100).percent())
        .setChildOf(this.barContainer)

        this.spacer = new UIContainer()
        .setX(new CenterConstraint)
        .setY(new SiblingConstraint)
        .setWidth((this.width * this.scale).pixels())
        .setHeight((4 * this.scale).pixels())
        .setChildOf(this.boundingBox)

        this.updateScale()
        this.updateData()
    }

    setScale(scale) {
        this.scale = scale
        this.updateScale()
    }

    updateScale() {
        this.barContainer
        .setWidth((this.width * this.scale).pixels())
        .setHeight((this.height * this.scale).pixels())

        this.spacer
        .setWidth((this.width * this.scale).pixels())
        .setHeight((4 * this.scale).pixels())
    }

    setData(data) {
        this.data = data
        this.updateData()
    }

    updateData() {
        if(this.data == undefined) {
            this.hide()
            return
        }
        else {
            this.unhide()
        }

        this.name
        .setText(this.data.Name)
        .setColor(new Color(this.data.ColorScheme.Text[0], this.data.ColorScheme.Text[1], this.data.ColorScheme.Text[2], this.data.ColorScheme.Text[3]))

        this.bar
        .setColor(new Color(this.data.ColorScheme.BgBar[0], this.data.ColorScheme.BgBar[1], this.data.ColorScheme.BgBar[2], this.data.ColorScheme.BgBar[3]))

        this.healthBar
        .setWidth((this.data.HPPercentage).percent())
        .setColor(new Color(this.data.ColorScheme.FgBar[0], this.data.ColorScheme.FgBar[1], this.data.ColorScheme.FgBar[2], this.data.ColorScheme.FgBar[3]))

        this.hp
        .setText(this.data.HPLabel)
        .setColor(new Color(this.data.ColorScheme.Text[0], this.data.ColorScheme.Text[1], this.data.ColorScheme.Text[2], this.data.ColorScheme.Text[3]))
    }

    hide() {
        this.barContainer.hide()
        this.spacer.hide()
    }

    unhide() {
        this.spacer.unhide(true)
        this.barContainer.unhide(true)
    }
}

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
        this.tempBars = false

        this.loadData()
    }

    loadData() {
        while (this.bars.length < this.data.length) {
            this.createBossBar()
        }
        this.bars.forEach((element, index) => {
            element.setData(this.data[index])
        })
    }

    createBossBar() {
        this.bars.push(new HealthBar(this.boundingBox, this.width, this.height, this.scale))
    }

    updateState(updateData = false) {
        this.loadData()
        super.updateState(updateData)
    }

    updateWidth() {
        this.bars.forEach((bar) => {
            bar.setScale(this.scale)
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
        this.loadData()
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