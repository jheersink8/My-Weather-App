# My Weather App

## Description

Deployed site: https://jheersink8.github.io/My-Weather-App 

This is a simple weather checking site that, when a user searches for a city, shows the current and five day forecast of the temperature, humidity, wind speed, and a weather icon. The user also has the ability to save cities to a list of favorites (which are saved to local storage) and quickly access them later. 

My main motivation for building this site was to familiarize myself with APIs. Some of the new concepts I learned include (but are not limited to): 

-	Using different API fetches to obtain the specific data I wanted
-	Creating algorithms to consistently respond to API data when its parameters change
-	Preventing cached data from overriding new API data 
-	Further local storage practices 
-	Further practice with Bootstrap, Jquery, and dayJS

## Usage

All requested acceptance criteria have been met in this challenge. The parameters of the weather (temperature,  humidity, and wind speed) are all displayed for the current weather and the five day forecast after the user searches for a city. Additionally, the city they search for will display along side with the state so the user has affirmation that they’re searching for the proper location. Also, the dates and weather icons that correspond to the weather output also display. 
The output for the five day forecast is an output of the weather at noon each day. This parameter can be changed at the users request since the API included weather snapshots at three hour intervals for the five day forecast. 
If the user has a list of cities they want to check on regularly, they can use the “add city to favorites” option in the settings menu. When they reload a city, it will always contain the latest API data rather than cached data. Lastly, they can use the “clear favorites” button to remove them from local storage. 
See screenshot below for a demonstration of how the app displays its content. 

Future suggestions for the client include:  
-	Adding the option to change format from imperial to metric through the settings menu 

![A screenshot of the weather app calling API data for Denver, Colorado.](./Assets/images/screenshot.png)

## Credits
The original scenario was presented by Denver University in the Bootcamp course ID DU-VIRT-FSF-PT-12-2023-U-LOLC-MWTH under Module 6 Challenge. All code was generated and submitted by Jordan R. Heersink.

## License
MIT License Copyright (c) 2024 Jordan Heersink Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.