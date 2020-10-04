# polka-match

polka-match is a web-based game for one or two players. to win the game, the player must find and select all of the polka dots in the game area that match the rbg value of the GOAL color.

this game is being created for General Assembly's Software Engineering Intensive, project 1.


**************
USER STORIES
************
1. player can select game difficult, easy and challenge. easy mode produces larger, easier-to-see polka dots while challenge mode produces smaller ones.
2. player will press START GAME to generate the colored 'goal' polka dot in the game dashboard
3. after a few seconds to study the color, the player sees the game area fill with similarly-colored 'game' polka dots
4. player will select game polkas by clicking on them to attempt and match the goal color.
5. if the player is correct, it will show in the game dashboard, counting from zero to the specified number of colored polka dots to find for that round.
6. if the player is is wrong, they will be penalized and docked one point from the 'wrong attempts left' counter
7. player wins the level if they correctly identify all goal colored polkas in the game area in the specified amount of time, moving to the next level.
8. the player loses if they do not find the goal colored polkas in time OR they make too many wrong attempts. the game restarts from level 1.


**************
DELIVERABLES
************
this game will utilize html, css, with javascript, and jQuery for DOM manipulation

*******************
GAME REQUIREMENTS
*****************
--this game will randomly select color values.
--once a goal color is identified, the program will generate an array of similar color values within a % range, appropriate for the game level.
--EASY mode will produce larger polka dots, and a higher % of acceptable color values throughout the progression of the game
--CHALLENGE mode will produce smaller polka dots, have a lower % of accepted color values, and as the game progresses, the colors will randomly move around the game board to distract the player.




