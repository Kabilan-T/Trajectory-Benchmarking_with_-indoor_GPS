# add user to group
sudo adduser $USER dialout

# Build Executable file
cd src/assets
pyinstaller --onefile --add-data 'templates:templates' --add-data 'static:static' scripts/app.py

# Run electron app
npm install
npm start

# Build debian package
yarn install
yarn run
dist:linux
