# Please join and contribute!

# covid19app

Mobile app(s) helping us fight the covid19 virus. Build by humans. Build for humans.

This repository contains the actual mobile app. The backed is at [covid19server](https://github.com/covid19app/covid19server).


## Assumptions

1. We don't want to get be all isolated for a year and half (or more) until we have vaccine.

2. We don't want 100,000,000 people or more to die either.

3. We want to drive the #covid19 out of existence by mass testing, self quarantine, large scale quarantine, spread tracking, and of course by great healthcare!

4. We act now! Governments fund the tests. We don't have to bother with details like insurance. Maybe a month later we can send some report to some insurance or whatever. Not important right now.

5. We build this together. We use it together.

6. The data collected are for fighting this disease only (plus public research for infectious diseases). Data are accessed only by public code (everybody can review). Only aggregate data are published. The usage can be stratched in order to drive the virus out with local heath care and authorities. But we are not building surveillance, nor advertising, nor any other data reselling or repurposing.


## Roadmap

Scale up testing is the highest priority!


#### Mobile App(s)

- [x] Personal App: Enter symptoms (for a given timestamp).

- [x] Personal App: Give recommendation: stay cool / go get test / call doctor / self quarantine.

- [x] Personal App: Deeplink to maps to navigate to nearest test sample collection location.

- [x] Personal App: Generate QR code for the lab collection heroes to scan and pair phone with the testkit.

- [x] Test Collection App: Pair QR code from person's phone (or paper) and pair it with bar code on testkit.

- [x] Lab App: Scan testkit barcode and enter result - infected or not.

- [x] Personal App: Get push notification with result.

- [ ] Collecting location - gps, wifi, bluetooth. Even if we don't use it on day one. We have to know if we met somebody infected. We don't need to know who. We do not want to blame. We just want to drive the virus out of existence.

- [ ] Split the app into multiple dedicated apps for different users.

- [ ] Build an app for doctors. How can we help them?

- [ ] Allow contact tracing through eplicit social graph building (like scan qr code of a person i'm spending the day with).


#### Server

- [x] Build the server.

- [ ] Public dashboard counting people symptomatic, tested, infected per day per zip, county, state, country, globe.

- [ ] Contact tracing.

- [ ] Integration with existing systems - EHR, unemplyment benefits, etc.


## How can I help?

We are glad you asked! Please contribute!

1. Let more people know about the project.

2. Start contributing!

3. Do you have friends working in healthcare, CDC, government? Ask them what would really help them need and let's build it!

4. Not an engineer? No problem! Help please! Build awareness (some pr please), translate to more languages, coordinate needs with your local health care heroes and governments.


## Architecture

Frontend is in react native + expo. That should work well for both android and ios.

Api is in rest+json.

Server - First version should be tonight...
Server will run in one of the big cloud providers.

Most of the interaction we need first are really just events. Not a chatty protocol. That simplify stuff. Entering symptoms, Pairing patient with test kit, entering test result are all just forms submitted upon completion.


## Credits

* The graphics is from [KP Arts](https://www.iconfinder.com/katsana24). Thank you!
