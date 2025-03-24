# load_env.sh

Load environment variables from dotenv / .env file

## Usage

```bash
set -a
. <(curl -s bash.3cm.app/load_env.sh|bash -s .env)
set +a

declare -p
```

## Refs

- `https://gist.github.com/mihow/9c7f559807069a03e302605691f85572#gistcomment-3625310`
