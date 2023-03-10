// import { TextEncoder, TextDecoder } from "util";
// // jest setup for node v14.18.3
// global.TextEncoder = TextEncoder;
// // @ts-ignore
// global.TextDecoder = TextDecoder;

import { scan, appReady, multiPageScan, crawlList } from "@a11ywatch/a11ywatch";
import { UsersController } from "@a11ywatch/core/core/controllers";

jest.setTimeout(300000);

describe("suite", () => {
  const email = "myemail@gmail.com"; // test auth email
  const password = "mypass"; // test auth password
  // can register a user into the app
  test("can register via email", async () => {
    await appReady();

    const data = await UsersController().createUser({
      email,
      password,
    });

    expect(data.email).toEqual(email);
    expect(data.password).not.toEqual(password); // password is hashed!!
  });

  // can sign on a user into the app
  test("can login via email", async () => {
    await appReady();

    const data = await UsersController().verifyUser({
      email,
      password,
    });

    expect(data.email).toEqual(email);
    expect(data.password).not.toEqual(password); // password is hashed!!
  });

  // can scan a single website using enhanced scan
  test("starts the server properly and run single page scan", async () => {
    const results = await scan({ url: "https://a11ywatch.com" });

    expect(results.data).toBeTruthy();
  });

  // can run authenticated multi page crawl by user id
  test("can multi page crawl by user", async () => {
    await appReady();

    const data = await UsersController().verifyUser({
      email,
      password,
    });

    await multiPageScan(
      {
        url: "https://a11ywatch.com",
        userId: data.id,
      },
      ({ data }) => {
        const issuesCount = data.issues.filter(
          (issue) => issue.type === "error"
        ).length;
        expect(issuesCount).toBeLessThan(30);
      }
    );
  });

  test("can multi page crawl a list of urls", async () => {
    await appReady();

    const pageList = [
      "https://a11ywatch.com",
      "https://a11ywatch.com/website-accessibility-checker",
      "https://a11ywatch.com/faq",
      "https://a11ywatch.com/contact",
      "https://a11ywatch.com/terms-of-service",
      "https://a11ywatch.com/inactivity-policy",
      "https://a11ywatch.com/register",
      "https://b.com",
    ];

    const pages = await crawlList({
      pages: pageList,
      userId: 0,
    });

    expect(pages.length).toBe(pageList.length);
  });

});
