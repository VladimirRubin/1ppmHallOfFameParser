var https = require('https');

var url = 'https://raw.githubusercontent.com/1ppm/1ppmLog/master/HallOfFame.md';

var baseRegex = /\#{1,2}\s\[([^\]]+)\]\(([^)]+)\)(\s\(.*(\@[^\)\]]+).*\))?(\n{1,}(\|.+\|))+/g;
var USERNAME_GROUP = 1;
var USER_URL_GROUP = 2;
var USER_TWITTER_GROUP = 4;
var PROJECTS_GROUP = 0;

var projectsRegex = /^\|([0-9\s\/]+)\|(.+?)\|(.+?)\|((.+)\|)?/gm;
var PROJECT_DATE_GROUP = 1;
var PROJECT_NAME_GROUP = 2;
var PROJECT_DESCRIPTION_GROUP = 3;
var PROJECT_STATUS_GROUP = 5;

var request = https.get(url, function(res) {
    var body = [];
    res.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        content = Buffer.concat(body).toString();
        var result = convertMDtoJSON(content);
        console.log(JSON.stringify(result, null, 4));
    });
});

function convertMDtoJSON(mdContent){
  var data = [];
  var usersMatch;
  while ((usersMatch = baseRegex.exec(mdContent)) !== null) {
    if (usersMatch.index === baseRegex.lastIndex) {
        baseRegex.lastIndex++;
    }
    
    var userData = {
        username: usersMatch[USERNAME_GROUP],
        githubUrl: '',
        twitterName: usersMatch[USER_TWITTER_GROUP] || '',
        otherUrl: '',
        projects: [] 
    };

    var userUrl = usersMatch[USER_URL_GROUP];
    if (userUrl.indexOf('github') > -1) {
        userData['githubUrl'] = userUrl;
    } else {
        userData['otherUrl'] = userUrl;
    }
    
    var projectsMD = usersMatch[PROJECTS_GROUP];
    var projectsMatch;
    while ((projectsMatch = projectsRegex.exec(projectsMD)) !== null) {
        if (projectsMatch.index === projectsRegex.lastIndex) {
            projectsRegex.lastIndex++;
        }
        // Date processing
        var projectDate = projectsMatch[PROJECT_DATE_GROUP].trim().split('/').reverse().join('');
        // Name processing
        var projectName = projectsMatch[PROJECT_NAME_GROUP].trim();
        var nameParts = projectName.split(']');
        if (nameParts.length) {
            projectName = nameParts[0].replace('[','');
        }
        // Description processing
        var projectDescription = projectsMatch[PROJECT_DESCRIPTION_GROUP].trim();
        var projectStatus = projectsMatch[PROJECT_STATUS_GROUP] ? projectsMatch[PROJECT_STATUS_GROUP].trim() : '';
        project = {
            date: projectDate,
            name: projectName,
            description: projectDescription,
            status: projectStatus
        }
        userData.projects.push(project);
    }
    data.push(userData);
  }
  return data;
}
