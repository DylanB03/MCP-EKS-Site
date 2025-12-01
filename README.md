# AWS Portfolio Site
Private site for my portfolio. 
Backend: Python, Docker, AWS EC2
Frontend: React / Next.js

## Local Running

For this to run locally, you require multiple bash terminals.

### Requirements
You need python, docker, and npm installed

### .env File

.env file 
```bash
touch .env
```

Sample .env
```bash
model_host="0.0.0.0"
model_port=8000
model_name="GEMINI"
email="email@provider.com"
phone="1234567890"
GEMINI_API_KEY="ThisIsMyKey12345"

```

### Server Setups

```bash
#run dockerfile for backend
#build
docker build . -t geminiserver:latest
#run and port forward to 8000 -> 8000
docker run -p 8000:8000 geminiserver:latest
```

## Run the Next.js App

### .env.local file
```bash
cd nextjs

touch .env.local
```

Sample:
```
LLM_URL=http://url_hosting_backend.com
```

```bash

npm run dev

```

