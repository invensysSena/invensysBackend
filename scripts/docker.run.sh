echo "                   .--."
echo "                  |o_o |"
echo "                  |:_/ |"
echo "   Invensys      //     \ \\"
echo "                (|     | )"
echo "               /'\_   _/'\\"
echo "               \___)=(___/"



cd  C:\Users\ospin\Documents\proyecto personal\invensysBackend
cd ..
pwd
# Detén y elimina el contenedor existente (si existe)
docker stop invensysback 2>/dev/null || true
docker rm invensysback 2>/dev/null || true

# Elimina la imagen existente (si existe)
docker rmi invensysback 2>/dev/null || true

# Construye la nueva imagen a partir del Dockerfile actual
docker build -t invensysback .

docker run -d -p 3001:5001 --name invensysback invensysback

# Verifica que el contenedor esté en ejecución
docker ps