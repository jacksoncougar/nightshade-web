/* eslint-disable no-undef */
const Timer = require("../src/timer");

describe("Timer", () => {
  it("starts a one minute timer and updates correctly", async () => {
    const timer = new Timer.Timer();

    await timer.start(0.01);
  });

  it("starts a one minute timer and finishes correctly", async () => {
    const timer = new Timer.Timer();

    spyOn(timer.emitter, "emit");

    try {
      await timer.start(0.01);
      expect(timer.emitter.emit.mostRecentCall.args[0]).toBe("expirede");
    } catch (error) {
      fail("bad promise");
    }

    fail("bad promise");
  });
});
