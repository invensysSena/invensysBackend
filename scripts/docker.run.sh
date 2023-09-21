cd  C:\Users\ospin\Documents\proyecto personal\invensysBackend
cd ..
pwd
docker stop $(docker ps -a -q)
docker rmi -f $(docker images -q)
docker build  -t invensysback .
docker images
docker run --name invensysbackport  -p 3031:5454 invensysback