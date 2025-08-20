from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:5173")
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/analyse-view.png")

    synthese_link = page.get_by_role("link", name="Synthese")
    synthese_link.click()
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/synthese-view.png")

    explorer_link = page.get_by_role("link", name="Lens Explorer")
    explorer_link.click()
    time.sleep(2)
    page.screenshot(path="jules-scratch/verification/explorer-view.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
