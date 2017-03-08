# D&D Character Sheet Viewer

Broadly speaking, this is the front-end of a service to manage Dungeons and Dragons character sheets. **More specifically,** this is the front-end of a service to manage Dungeons and Dragons character information. This includes, but will not be limited to:

|Race                      |Class                       | Personality|
|--------------------------|----------------------------| -----------|
|Ability Score Improvements|Hit Dice                    | Name       |
|Languages                 |Primary Ability             | Sex        |
|Age                       |Saving Throw Proficiencies  | Size       |
|Alignment                 |Armor & Weapon Proficiencies| Ideals     |
|Size                      |                            | Bonds      |
|Speed                     |                            | Flaws      |
|Subrace                   |                            | Inspiration|
|                          |                            | Feature    |
|                          |                            | Personality|
|                          |                            | Proficiency|

Certain details of a character will be computed by a more robust API. One which has access to the enormous amount of detail necessary to make decisions on things such as ability score improvements based on level and class, or multiclassing. This front end will only be responsible for displaying the information it receives from said API.

# Contributor List
1. [Sal Torcivia](http://saltor.nyc) (creator)