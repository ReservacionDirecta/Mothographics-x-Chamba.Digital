import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const projects = [
  { url: 'https://pacificsurfschool.com.pe', name: 'pacificsurfschool' },
  { url: 'https://latamabogados.com', name: 'latamabogados' },
  { url: 'https://penalindabungalows.up.railway.app', name: 'penalindamancora' },
  { url: 'https://www.dupla.work', name: 'dupla' },
  { url: 'https://kabsa.pe', name: 'kabsa' },
  { url: 'https://puntanegritos.webflow.io', name: 'puntanegritos' },
  { url: 'https://haciendadonvicente.com', name: 'haciendadonvicente' },
  { url: 'https://fundoachamaqui.com', name: 'fundoachamaqui' },
  { url: 'https://sauce.pe', name: 'sauce' },
  { url: 'https://jahsurfperu.com', name: 'jahsurfperu' },
  { url: 'https://olivosdelperu.com', name: 'olivosdelperu' },
  { url: 'https://hothelia.com', name: 'hothelia' },
];

const thumbsDir = path.join(process.cwd(), 'public', 'thumbs');

async function captureAll() {
  if (!fs.existsSync(thumbsDir)) {
    fs.mkdirSync(thumbsDir, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  for (const project of projects) {
    const filepath = path.join(thumbsDir, `${project.name}.webp`);
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${project.name} - already exists, skipping`);
      continue;
    }

    console.log(`⏳ ${project.name} - capturing ${project.url}...`);
    const page = await browser.newPage({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
    });

    try {
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for loading screens to disappear
      await page.waitForFunction(() => {
        const loadingSelectors = [
          '[class*="loader"]', '[class*="loading"]', '[class*="spinner"]',
          '[class*="preloader"]', '[id*="loader"]', '[id*="loading"]',
          '[id*="preloader"]', '.pace', '#pace', '[class*="skeleton"]',
          '[class*="placeholder"]', '[class*="splash"]'
        ];
        for (const sel of loadingSelectors) {
          const el = document.querySelector(sel);
          if (el && (el as HTMLElement).offsetParent !== null) return false;
        }
        return document.body && document.body.innerText.length > 100;
      }, { timeout: 15000 }).catch(() => {});

      // Wait for images
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.querySelectorAll('img')).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>(resolve => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
              setTimeout(resolve, 3000);
            });
          })
        );
      });

      await page.waitForTimeout(1000);

      await page.screenshot({
        path: filepath,
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 720 },
        type: 'png',
      });

      console.log(`✅ ${project.name} - saved`);
    } catch (e: any) {
      console.error(`❌ ${project.name} - failed: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n🎉 All thumbnails captured!');
}

captureAll();
