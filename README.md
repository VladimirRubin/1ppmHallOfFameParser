# 1ppmHallOfFameParser
1ppm HallOfFame MD to JSON parser!

A Parser Markdown to JSON for [1ppmLog project](https://github.com/1ppm/1ppmLog/issues/38)

It's a repo with Python/JS CLI script for converter HallOfFame.md to JSON format.

The script takes the url to RAW data on github (https://raw.githubusercontent.com/1ppm/1ppmLog/master/HallOfFame.md) and gives the JSON data of all projects from file.

How to use Python version (run from python_version dir):

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

How to use JS version (run from js_version dir):

1. node parser.js

The output will be like next:
```json
[
    {
        "username": "aguaviva",
        "githubUrl": "https://github.com/aguaviva",
        "otherUrl": "",
        "projects": [
            {
                "201611": {
                    "name": "Physics engine",
                    "description": "Physics engine, along with a short tutorial on constraints (runs in browser)",
                    "status": ""
                }
            },
            {
                "201612": {
                    "name": "Neural network",
                    "description": "Neural network classifier, includes tutorial on backpropagation (runs in browser)",
                    "status": ""
                }
            }
        ]
    },
    ...
]
```
