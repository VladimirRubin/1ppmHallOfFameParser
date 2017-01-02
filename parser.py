import click
import re
import requests
import json
from collections import OrderedDict


@click.command()
@click.option(
    '--url',
    default='https://raw.githubusercontent.com/1ppm/1ppmLog/master/HallOfFame.md',
    help='The URL to RAW content of MD file'
)
def parseHallOfFame(url):
    base_regex = r'\#\# \[([^]]+)\]\(([^)]+)\)([^##]+)'
    USERNAME_GROUP = 1
    USER_URL_GROUP = 2
    PROJECTS_GROUP = 3

    projects_regex = r'^\|([0-9\s\/]+)\|(.+?)\|(.+?)\|((.+)\|)?'
    PROJECT_DATE_GROUP = 1
    PROJECT_NAME_GROUP = 2
    PROJECT_DESCRIPTION_GROUP = 3
    PROJECT_STATUS_GROUP = 5

    data = []

    r = requests.get(url)
    content = r.text

    matches = re.finditer(base_regex, content)
    for matchNum, match in enumerate(matches):
        user_data = OrderedDict.fromkeys(['username', 'githubUrl', 'otherUrl', 'projects'], '')
        user_data['username'] = match.group(USERNAME_GROUP)
        user_data['projects'] = {}

        user_url = match.group(USER_URL_GROUP)
        if 'github' in user_url:
            user_data['githubUrl'] = user_url
        else:
            user_data['otherUrl'] = user_url

        projects_md = match.group(PROJECTS_GROUP)
        projects_matches = re.finditer(projects_regex, projects_md, re.MULTILINE)
        for projectMatchNum, projectMatch in enumerate(projects_matches):
            # Date processing
            project_date = ''.join(list(reversed(projectMatch.group(PROJECT_DATE_GROUP).strip().split('/'))))
            # Name processing
            project_name = projectMatch.group(PROJECT_NAME_GROUP).strip()
            parts = project_name.split(']')
            if len(parts) > 1:
                project_name = parts[0].lstrip('[')
            # Description processing
            project_description = projectMatch.group(PROJECT_DESCRIPTION_GROUP).strip()
            # Status processing
            project_status = ''
            if len(projectMatch.groups()) == PROJECT_STATUS_GROUP:
                project_status = projectMatch.group(PROJECT_STATUS_GROUP)
                project_status = project_status.strip() if project_status is not None else ''
            project_dict = OrderedDict.fromkeys(['name', 'description', 'status'], '')
            project_dict['name'] = project_name
            project_dict['description'] = project_description
            project_dict['status'] = project_status
            project = {
                project_date: project_dict
            }
            user_data['projects'].update(project)
        user_data['projects'] = OrderedDict(sorted(user_data['projects'].items(), key=lambda x: x[0]))
        data.append(user_data)
    data.sort(key=lambda d: d['username'])
    click.echo(json.dumps(data, indent=4))


if __name__ == '__main__':
    parseHallOfFame()
