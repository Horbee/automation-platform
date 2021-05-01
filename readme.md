# CS50 Automation

#### Author: Norbert Horgas

#### Video Demo: <URL HERE>

# Short Description:

This project is a Web Application made by me as the Final Project for Harvard's CS50 Course. It helps automating voice controlled room cleaning with a Roborock S5. This is a functions, which is currnetly not supported by the Xiaom Home application or Google Home. You can start a complete home cleaning with the voice assistant, but selecting individual rooms to clean by voice was not possible.

The Application consists of a server side Flask API and client side React application. The Flask API uses a package, called [python-miio](https://pypi.org/project/python-miio/) to control the vacuum cleaner connected to your local network.

The Application uses Google OAuth to manage users and authentication. The Voice control part is done with Google Assistant. After you set up the project and all the necessary dependencies, you can tell Google Assistant something like:

> "Hey Google, talk to CS50Automation and clean the kitchen."

## Necessary items / setups:

- Roborock S5 (only tested with this model and firmware: 3.5.8_002034)
- Need to get your Roborock's IP and Token
- Figure out your Room IDs (see below)
- You need to clone the project and setup on your server (Raspberry Pi)
- You need to make your server publicly available on the internet. You can use port forwarding or a tunneling solution like Ngrok or PageKite
- Setup a project at Google Cloud Platform to get API key and Secret for OAuth
- Setup an Action for Google Assistant and use the Webhook to call your Server

# Step 1: Aquire your Roborock's IP and Token

In this step we are going to use the [Xiaomi-cloud-tokens-extractor](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) to aquire the IP and Token of the device.

`git clone https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor.git`

`cd Xiaomi-cloud-tokens-extractor`

`python3 token_extractor.py`

Enter Xiaomi Home credentials, and select server region. If some dependencies are missing (like python3 or requests) make sure to install them before executing the script.

You will get a result similar like this. Mark the IP and the Token for Step 3.

```
NAME:     <Vacuum Cleaner name>
ID:       <ID>
IP:       <Vacuum Cleaner's IP>
TOKEN:    <YOUR TOKEN>
MODEL:    roborock.vacuum.s5
```

# Step 2: Setup Google OAuth

Navigate to: https://console.cloud.google.com/ and create a new Project. Enter a name, you want your porject to be called.

Make sure, your project is selected.
Go to API Dashborad: https://console.cloud.google.com/apis/dashboard

Click on OAuth Consent Screen and configure it. Fill out only the necessary informations.

After that click on Credentials > Create Credentials > OAuth Client ID

Application Type: Web Application
Name: Cs50Automation
Authorized Javascript Domains:

```
http://localhost:5000
http://localhost:3000
https://<>.pagekite.me (we will create this in a next step)
```

Mark ClientId and Client Secret

# Step 3: Clone and Setup the project

```
git clone https://github.com/Horbee/cs50automation.git
cd cs50automation
```

## Install and Build React Client

(make sure that node, npm and yarn package manager are installed)

```
node -v
npm -v
yarn -v
```

Rename `.env.example` file and add Google Client ID

```
cd client
mv .env.example .env
sudo nano .env
```

```
REACT_APP_GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxx
```

(Ctrl + X, Y, Enter to save)

```
yarn install
yarn build
```

This will create a `/build` folder for you

## Install and Build Flask API

```
cd ..
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
mv .env.example .env
sudo nano .env
```

You will need to fill out he enviroment file with the necessary credentials

Note: GOOGLE_ASSISTANT_CLIENT_ID is not yet setup. You will need to come back and fill out this information after setting up the Action for Google Assistant.

```
VACUUM_IP=xxxxxxxxxxxxxxxxxxxxxxxx
VACUUM_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
GOOGLE_ASSISTANT_CLIENT_ID=
ENV=prod
```

## Figure out your Room Ids:

the API endpoint needs to send the correct room Id in a list to your Roborock. Unfortunately creating this list is a bit cumbersome. The only way that worked for me is the way, how Homebridge is aquiring these ids: Setting up a Timer in Xiaomi Home and then ask for the timer list.

## NginX setup

```
sudo apt install nginx
sudo rm /etc/nginx/sites-enabled/default
sudo cp ./service/cs50automation.nginx /etc/nginx/sites-available/cs50automation.nginx
sudo ln -s /etc/nginx/sites-available/cs50automation.nginx /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## Setup cs50automation Service

```
sudo cp ./service/cs50automation.service /etc/systemd/system/cs50automation.service
sudo systemctl enable cs50automation.service
sudo systemctl start cs50automation.service
```

Now the Cs50Automation app should be accessible on your network, however you wont be able to log in, since Google OAuth needs a publicly accessible URL to work.

# Step 4: Setup Pagekite

- Create account at [Pagekite](https://pagekite.net/) and configure your kite
- You will end up with a domain like: xxxxxxxx.pagekite.me

```
sudo cp ./service/pagekite.service /etc/systemd/system/pagekite.service
sudo systemctl enable pagekite.service
sudo systemctl start pagekite.service
```

# Step 5: Setup Action on Google Assistant

TODO

# References & Readings

https://trstringer.com/logging-flask-gunicorn-the-manageable-way/
https://prettyprinted.com/tutorials/automatically_load_environment_variables_in_flask
https://blog.miguelgrinberg.com/post/how-to-deploy-a-react--flask-project
https://blog.miguelgrinberg.com/post/running-a-flask-application-as-a-service-with-systemd

## Pagekite: for accessing /admin route you need to add +insecure flag:

https://pagekite.net/wiki/Floss/TechnicalManual/

## Identifing Room IDs:

https://github.com/homebridge-xiaomi-roborock-vacuum/homebridge-xiaomi-roborock-vacuum/issues/277

getRoomList() method:
https://github.com/homebridge-xiaomi-roborock-vacuum/homebridge-xiaomi-roborock-vacuum/blob/8b65bedf55cdf70a322920b5dab78645cfbadc84/index.js#L1020
