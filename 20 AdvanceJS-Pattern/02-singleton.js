const StationClock = {
  _hour: 0,
  _minute: 0,

  tick() {
    this._minute++;
    if (this._minute >= 60) {
      this._minute = 0;
      this._hour = (this._hour + 1) % 12;
    }
  },

  getTime() {
    return `${this._hour.toString().padStart(2, "0")}:${this._minute.toString().padStart(2, "0")}`;
  },
};

//closure based ringCount
const StationBell = (function () {
  let ringCount = 0;

  const instance = {
    ring() {
      ringCount++;
      return `Bell is ringing! Count: ${ringCount}`;
    },
    total() {
      return ringCount;
    },
  };

  return instance;
})();

//Class based singleton implementation
class ClockMechanism {
  constructor() {
    if (ClockMechanism.instance) {
      return ClockMechanism.instance;
    }
    this._hour = 19;
    this._minute = 0;
    ClockMechanism.instance = this;
  }

  tick() {
    this._minute++;
    if (this._minute >= 60) {
      this._minute = 0;
      this._hour = (this._hour + 1) % 12;
    }
  }

  getTime() {
    return `${this._hour.toString().padStart(2, "0")}:${this._minute.toString().padStart(2, "0")}`;
  }

  static getInstance() {
    if (!ClockMechanism.instance) {
      ClockMechanism.instance = new ClockMechanism();
    }
    return ClockMechanism.instance;
  }
}

// console.log(StationClock.getTime()); // 12:00
// StationClock.tick();
// StationClock.tick();
// StationClock.tick();
// StationClock.tick();
// console.log(StationClock.getTime()); // 12:01

// console.log(StationBell.ring()); // Bell is ringing! Count: 1
// console.log(StationBell.ring()); // Bell is ringing! Count: 2
// console.log(StationBell.total()); // 2

//Class based singleton implementation
const clock1 = ClockMechanism.getInstance();
clock1.tick();
clock1.tick();
console.log(clock1.getTime()); // 12:02

const clock2 = ClockMechanism.getInstance();
clock2.tick();
clock2.tick();
console.log(clock2.getTime()); // 12:02 (same instance as clock1)

console.log("Clock1 Time:", clock1.getTime()); // 12:02
console.log("Clock2 Time:", clock2.getTime()); // 12:02 (same instance as clock1)
console.log(clock1 === clock2); // true (both references point to the same instance)
