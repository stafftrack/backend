# backend

## API

### Create Entry 
- EndPoint: `http://{ip}:3000/api/entry`

## Run locally
```shell
npm install
node main.js
```

## Docker
```shell
docker build -t /img_name/ .
docker run --name /container_name/ -p 3000:3000 /img_name/
```

## Docker-compose
Download `ai-server`, `backend`
```shell
mv docker-compose.yml ../
cd ..
docker-compose up -d --build
```


