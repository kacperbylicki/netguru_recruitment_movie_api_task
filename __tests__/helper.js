const { TestScheduler } = require("jest");
require("dotenv").config();

const { generateId } = require("../source/helper/generator/");
const { firstOfNextMonth } = require("../source/helper/time/");

const cases = [
    { uid: 435, Title: "How to train your dragon" }, 
    { uid: 345, Title: "The Witcher" }, 
    { uid: 1223, Title: "How to"}, 
    { uid: 5667, Title: "Forrest Gump" },
];

describe("generateId returned id length", () => {
    it.each(cases)("Should return id of length 40",
        (payload) => {
            const result = generateId(payload).length;
            expect(result).toEqual(40)
        }
    );
});

describe("firstOfNextMonth returned type", () => {
    it("Should return number", () => {
            const value = firstOfNextMonth();

            expect(typeof value).toBe('number');
        }
    );
});