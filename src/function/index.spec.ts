import { handleRequest } from ".";

const Args = {
  QSTASH_CURRENT_SIGNING_KEY: process.env.QSTASH_CURRENT_SIGNING_KEY || "",
  QSTASH_NEXT_SIGNING_KEY: process.env.QSTASH_NEXT_SIGNING_KEY || "",
};

global.fetch = jest.fn() as jest.Mock;


describe("Upstash Schedule", () => {
  it.todo("should ...");
});
