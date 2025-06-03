# bash.3cm.app

[Usage](https://bash.3cm.app)

Steps:

- create a repo on github
- create a new site on `fleek.xyz`
  - 2 ways to deploy:
    - github action
    - link to github repo - this method can't extract deployment id, so need manually update cdn cname record...
- add custom domain
- add dns cname record: `<latest successful deployment id>.fleekcdn.xyz`
  - do not use `<Site Slug>.on-fleek.app`, it will cause problems
