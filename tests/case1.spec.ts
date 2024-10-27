import { test, expect } from "../wallet-setup/basic.ts";
import * as metamask from "@synthetixio/synpress/commands/metamask";
import {selectors} from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log("case execution started");
    await page.goto("/",{waitUntil: 'domcontentloaded'});
});

test("connect wallet using default metamask account and buy an NFT", async ({ page }) => {
    await page.click('button:has-text("Sign in")');
    const metamaskConnectButton = page.locator('text=MetaMask >> .. >> text=Connect');
    await metamaskConnectButton.click();
    metamask.acceptAccess();
    await metamask.allowToAddNetwork();
    await metamask.allowToSwitchNetwork();
    await page.locator('button:text("Verify")').click();
    await metamask.confirmSignatureRequest();

    await page.click("text=View popular collections");
    await page.click("text=Rumble Arcade Testnet");
    await page.click("text=Baahssassin Rank 2")

    await page.waitForTimeout(10000);
    await page.click('button:has-text("Buy Now")');

    await page.waitForTimeout(5000);
    await page.screenshot({path:"test-results/screenshot.png"});
    await page.waitForTimeout(1000);
    expect(page.locator("text=Insufficient Balance"));
});

test.afterEach(()=>{
    console.log("case execution completed");
})