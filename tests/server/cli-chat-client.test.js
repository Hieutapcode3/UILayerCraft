const test = require("node:test");
const assert = require("node:assert/strict");

const { killCliProcess } = require("../../src/server/providers/cli-chat-client");

test("killCliProcess ends the whole process tree with taskkill on Windows", () => {
  const calls = [];
  let plainKills = 0;
  killCliProcess({ pid: 4321, kill: () => { plainKills += 1; } }, {
    platform: "win32",
    spawnSyncImpl: (command, args) => calls.push([command, ...args])
  });
  assert.deepEqual(calls, [["taskkill", "/pid", "4321", "/T", "/F"]]);
  assert.equal(plainKills, 0);
});

test("killCliProcess uses child.kill() elsewhere and when taskkill is unavailable", () => {
  let plainKills = 0;
  const child = { pid: 99, kill: () => { plainKills += 1; } };
  killCliProcess(child, { platform: "linux", spawnSyncImpl: () => assert.fail("taskkill must not run off Windows") });
  killCliProcess(child, { platform: "win32", spawnSyncImpl: () => { throw new Error("no taskkill"); } });
  assert.equal(plainKills, 2);
});
