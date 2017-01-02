# 1ppmHallOfFameParser
1ppm HallOfFame MD to JSON parser!

A Parser Markdown to JSON for [1ppmLog project](https://github.com/1ppm/1ppmLog/issues/38)

It's a CLI script for converter HallOfFame.md to JSON format.

The script takes the url to RAW data on github (https://raw.githubusercontent.com/1ppm/1ppmLog/master/HallOfFame.md) and gives the JSON data of all projects from file.

How to use:

1. pip install -r requrements.txt
2. python parser.py --url=https://raw.githubusercontent.com/1ppm/1ppmLog/master/HallOfFame.md

The output will be like next:
```json
[
    {
        "username": "AlexKeyes",
        "githubUrl": "https://github.com/alex-keyes",
        "otherUrl": "",
        "projects": {
            "201701": {
                "name": "PHP Cowsay",
                "description": "Cowsay written in PHP",
                "status": ""
            }
        }
    },
    {
        "username": "Amar Lakshya",
        ...
    },
    ...
]
```