# v0.3.2
## Pre1
- Added saving before the update happens so you don't loose any data
- Disabling party commands or party warp now also disables custom warp as it can break other mods.
- Added a check to see if player is in crimson isle before saying has a playercount below 8
# v0.3.1
- Fixed party messages again (mb :dog:)
# v0.3.0
- Added an autoInvite on keyword option
- Modified the [Click to party] so it only appears with the set keyword
- Fixed auto messages not being sent
- Added an option to select what branch of updates to update to, main or prerelease
- Modified to use the tag instead of name for autoupdate
- Fixed an error that would happen when on mc screen
# V0.2.9
- Fixed getLore() so it doesnt break skyhanni
- Fixed party Commands
# V0.2.8
- Reworked Party Commands
- Added PlhegInfo Command
- Added Pick Command
- Removed mixendmod conversion
- Added auto updater
- Fixed rod timer not being the same when moving
- Added a command to see version: /rfuversion
- Added a color selector for settings background
- Fixed imports for Linux
- Added a fish next to the nametag of anyone who contributes to the mod
# V0.2.7
- Made keybindfix Work
- Changed config system to AmaterasuModded
- Inverted Changelog
- Revamped loading messages
- Bossbar now scales without being modified
- Fixed Hide if not relevant General not working
- Fixed Hide if not relevant Deployables not working on Power Orbs
- Fixed Hide if not relevant Trophy fishing not working
- Fixed Golden Fish Timer to now properly take into account rod casting.
- Added option to send message upon getting Diamond Trophy Fish
- Added option to auto rejoin party on twarp
- Added inventory highlighting caching
# V0.2.6
- Added new github version alert.
# V0.2.5
- Fixed Boss bars length not being updated
- Moved changelog to a separate file
- Added a cooler README
# V0.2.4
- Fixed Boss bars killing Fps
- Also fixed filename
# V0.2.3
- Fixed +2 Count Mobs Bars not working
- Fixed Plhegblast bar not working
# V0.2.2
- Fixed Jawbus health bar not working
# V0.2.1
- Fixed a typo on vanquisher counter
# V0.2.0
- Refactored UI System using SimpleOverlays
- Added DocilElm's keybind fix
# V0.1.4
- Fixed Golden fish timer for new values 
- Added Average Jawbus/Vial Count
# V0.1.3
- Fixed Thunder Killed 0.0s whenever doing blaze
# V0.1.2
- Fixed Flare timers not working
- Fixed Flare timers saying expired when there's another flare nearby
- Fixed golden fish timer 5m -> 3m
- Fixed sulfur skitter range 8 -> 4
- Fixed MF pieces overlay not working on decimal numbers
- Fixed rod timer sometimes breaking
- Fixed Guardian/Vanquisher timer breaking sometimes
- Added time to kill jawbus/thunder
- (Hopefully) Fixed drops not being counted correctly on double hooks
# V0.1.1
- Improved performance -> reworked rare drops thingy
- Fixed a bug where worm health would not be displayed at all
- Made Cast until more sensical
# V0.1.0
- Added /rfuaddvial count, which adds a vial to /vials
- Added /rfusetvialcount count, which sets the count to a number
- Made vial drops get copied to clipboard
- Hid the vanilla fishing rod timer when the setting is on
- Fixed sc counter timer being weird on worms with count worms anyways off
- Added inventory full debrief
- Added thunder bottle full title/message
- Made pet display show pet levels when equipping them manually
- Made pet display also now show rarity correctly
- Removed pet display customization :(
- Added inventory attributes/enchants display for lava fishing items
- Added /rfuunrendercoords command
- Made coords unrender automatically when leaving island
- Added rendering coords if someone sends them on chat
- Removed a test message on /stream
- Added !allinv and !ai alias to !allinvite
- Merged totem/power orb/flare expired sounds
- Added jawbusinfo, thunderinfo and vialinfo chat command
- Made chat commands blacklist case insensitive
- Added a click to party person message in guild chat and when getting booped
- Added an actual setting for the random dh messages, was too confusing before...
- Added a timer to vanquisher/thunder invulnerability
- Added settings to most UIs to toggle them off if they`re not relevant.
- Added more checks to the pet leveling up on the display so it displays accuratly
- Added an option to hide worms nametags in crystal hollows
- Added checks so !warp doesnt warp when on a private island or on a low player count nether lobby (8 or less)
- Added golden fish timer
- Added a space in the Y of the /coords command so it works better with other mods
- Added you`ve been here messages when joining a repeated lobby
- Added a setting to hide creature messages/dh messages
- Added drop messages for drops you dont usually see (also drop air for the funni)
- Added an option to make the im muted message warp party.
- Removed pet level up subtitle :(
- Reformated /rfubossstats and now shows last time caught
# V0.0.6
- Fixed sc/h timer :facepalm:
- Fixed vanquisher ([coords]) not working
# V0.0.5
- Added /rfutransfermixenddata
- Fixed /rfubossstats showing 1 over the count
- Fixed double hook messages still sending if not in a party
- Fixed sc counter and sc/h not counting event creatures
- Added !tw alias to !togglewarp
- Added !w alias to !warp
- Split Spirit mask and Phoenix ui into 2 settings
- Added keybind to turn on and of GUI, go to ur keybinds menu to set it.
- Added SOS flare utilities
- Merged all chat settings into one on the 'Other' tab
- Merged Deployable chat messages
- Added Fishing Rod Timer thingy
- Fixed vial dropped msg saying jawbus count to 0
- Fixed party commands not working if you start a party with /stream
- Added a warning if you fish 8 creatures without moving camera
- Added a warning if you fish a creature with bait bag disabled
# V0.0.4
- Fixed a bug where flux utilities wouldnt work if you have sea creature counter off
- Fixed a bug with flux expired sound
- Fixed new member help triggering if you have party commands disabled
- Fixed thunder detected when doing blaze slayer
- Added some checks to double hook messages to prevent sending blank messages
- Changed "Place Power Orb" default text to "Low mana!"
- Changed 'D' in timer to 'd'
- Added Mythic Creature Lootshare Range
- Changed some toggles to checkboxes
- Added /coords command
- Renamed flux settings to Power Orbs
- Moved Power Orbs and Corruption totem to deployables tab
- Moved mana low to 'other' tab
- Renamed Party Commands tab to Chat Commands
- Added resizing UI with scroll wheel
- Greatly improved ui movement
- Added vial drop messages
- Took out custom ui texts due to vigilance size limitations :(
# V0.0.3
- Added fisherman Tracking
- Fixed /rfudiscord
- added pet level up title alerts
- Made /wc work with priv messages
- Resized boss bar to have the width with every boss
- Added timer to sea creature counter
- Merged all fade in/duration/fade out sliders in the 'Other' tab
- Moved detection rates to 'Other' tab
- Added Phoenix/Spirit Mask Title/UI
- Added Sulphur block range
- Added Mythic Sc Counters
- Added Vanq Sc counter
- Fixed metadata issue
- Added Sc/h UI
- Added Mythic Sc messages
- Added vanquisher messages
- Added double hook messages, with a new twist
- Fixed Sc sound with count worms
- Fixed Party/Local chat setting
- Fixed boss health bars breaking with player with thunder/plhlegblast in their names
- Added mythic boss detection
- Added more party commands (!p, !togglewarp/twarp)
- Added Power Orb Utilities
# V0.0.2
- Added /wc command
- Reorganized Settings
- Fixed Settings Search Bar Crash
- Added GUI rendering possibility
- Added Corruption totem timer Gui
- Added Sea Creature Counter Message/Title/Sound/Gui
- Added Bobber Counter Gui
- Added Pet Display
- Added Boss Health Bars
- Added /rfuuimovetopleft command
# V0.0.1
Current Features:
- Party Commands
- Worm Fishing Message/Title/Sound
- Corruption Totem Message/Title/Sound
- Custom Messages