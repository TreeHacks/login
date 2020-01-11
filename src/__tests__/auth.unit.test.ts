import { parseJwt } from "../store/auth/actions";
import { isWhitelisted } from "../Login/LoggedIn";

describe("auth helper functions", () => {
  describe("parseJwt", () => {
    test("parses regular jwt", () => {
      expect(
        parseJwt(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        )
      ).toMatchInlineSnapshot(`
        Object {
          "iat": 1516239022,
          "name": "John Doe",
          "sub": "1234567890",
        }
      `);
    });
    test("parses malformed jwt", () => {
      expect(parseJwt("ABC")).toMatchInlineSnapshot(`null`);
    });
  });
});

describe("whitelist", () => {
  test("single domain", () => {
    const whitelist = ["treehacks.com"];
    expect(isWhitelisted("http://treehacks.com", whitelist)).toEqual(true);
    expect(isWhitelisted("http://root.treehacks.com", whitelist)).toEqual(false);

  });
  test("wildcard domain", () => {
    const whitelist = ["*.treehacks.com"];
    expect(isWhitelisted("http://treehacks.com", whitelist)).toEqual(true);
    expect(isWhitelisted("http://root.treehacks.com", whitelist)).toEqual(true);
    expect(isWhitelisted("http://root.dev.treehacks.com", whitelist)).toEqual(true);
  });
  test("domain + localhost", () => {
    const whitelist = ["*.treehacks.com", "localhost"];
    expect(isWhitelisted("http://treehacks.com", whitelist)).toEqual(true);
    expect(isWhitelisted("http://root.dev.treehacks.com", whitelist)).toEqual(true);
    expect(isWhitelisted("http://localhost", whitelist)).toEqual(true);
    expect(isWhitelisted("http://localhost:9000", whitelist)).toEqual(true);
  });
  test.skip("wildcard on subdomain", () => {
    // TODO: Not supported yet.
    const whitelist = ["*.dev.treehacks.com", "localhost"];
    expect(isWhitelisted("http://treehacks.com", whitelist)).toEqual(false);
    expect(isWhitelisted("http://root.dev.treehacks.com", whitelist)).toEqual(true);
  });
});