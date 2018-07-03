To start client, run ```npm run start``` from the ```client/``` dir.

* [x] Basic React+TS app with a reuseable Board Component - 43 min
* [] Place ships UI
    * [x] Thumbnails to select - 35 min
    * [x] Rotation support - 25 min
    * [x] Placement on board with boundries - 30 min
    * [ ] Boat collision prevent placement
* [] Initialize game controls (start api wire up)
* [] Bring in Redux?
* [] Wire up live moves with api
* [] ...

# Assumptions
My primary goal was to get the UI built out for a reusable Board component. I see this component very useful in other board games outside of Battleships.
After getting the Board component somewhat built out, it was time to put it to the test with Battleships UI.
I chose to prioritize a near-feature complete UI for positioning the ships on the board.
I think in the end I am only missing two critical features of the ship placement UI:
- Preventing placement of overlapping ships
- Clear board or some type of undo action
I cut some corners using 'any' typings given the time constraint.
Unfortunately, I did not get to wire up any of the API calls in time.