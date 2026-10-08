// Recipe steps shared by tools/shoot.mjs and tools/probe.mjs.
// A step is a one-key object, e.g. {"click": "text=Draw"} or {"fill": ["#title", "Hello"]}.

export function resolveUrl(base, u) {
  if (!u) return base;
  if (/^https?:|^file:/.test(u)) return u;
  return new URL(u, base).toString();
}

export async function runStep(page, step, recipe = {}) {
  const [kind] = Object.keys(step);
  const v = step[kind];
  const until = recipe.waitUntil || 'networkidle';
  switch (kind) {
    case 'goto': await page.goto(resolveUrl(recipe.url, v), { waitUntil: until, timeout: 60000 }); break;
    case 'click': await page.locator(v).first().click({ timeout: 15000 }); break;
    case 'clickAt': await page.mouse.click(v[0], v[1]); break;
    case 'dblclick': await page.locator(v).first().dblclick({ timeout: 15000 }); break;
    case 'hover': await page.locator(v).first().hover({ timeout: 15000 }); break;
    case 'fill': await page.locator(v[0]).first().fill(v[1], { timeout: 15000 }); break;
    case 'type': await page.locator(v[0]).first().click({ timeout: 15000 }); await page.keyboard.type(v[1], { delay: 6 }); break;
    case 'keys': await page.keyboard.type(v, { delay: 6 }); break;
    case 'press': if (Array.isArray(v)) await page.locator(v[0]).first().press(v[1]); else await page.keyboard.press(v); break;
    case 'select': await page.locator(v[0]).first().selectOption(v[1]); break;
    case 'check': await page.locator(v).first().check(); break;
    case 'wait': await page.waitForTimeout(v); break;
    case 'waitFor': await page.locator(v).first().waitFor({ timeout: 20000 }); break;
    case 'eval': await page.evaluate(v); break;
    case 'scroll': await page.evaluate((y) => window.scrollTo(0, y), v); break;
    case 'scrollTo': await page.locator(v).first().scrollIntoViewIfNeeded(); break;
    case 'css': await page.addStyleTag({ content: v }); break;
    case 'hide': await page.addStyleTag({ content: `${[].concat(v).join(',')}{visibility:hidden!important}` }); break;
    case 'remove': await page.evaluate((sels) => sels.forEach((s) => document.querySelectorAll(s).forEach((e) => e.remove())), [].concat(v)); break;
    case 'drag': await page.locator(v[0]).first().dragTo(page.locator(v[1]).first()); break;
    case 'mouse': {
      // {"mouse": [[x,y],[x,y],...]} draws one stroke through the points (viewport CSS pixels)
      await page.mouse.move(v[0][0], v[0][1]);
      await page.mouse.down();
      for (const [x, y] of v.slice(1)) await page.mouse.move(x, y, { steps: 6 });
      await page.mouse.up();
      break;
    }
    case 'strokes': {
      // {"strokes": [[[x,y],...], [[x,y],...]]} several strokes
      for (const s of v) await runStep(page, { mouse: s }, recipe);
      break;
    }
    case 'rightclick': {
      // {"rightclick": "#video"} or {"rightclick": ["#video", 0.3, 0.2]} (fractions of the element box)
      const [sel, fx = 0.5, fy = 0.5] = [].concat(v);
      const box = await page.locator(sel).first().boundingBox();
      await page.mouse.click(box.x + box.width * fx, box.y + box.height * fy, { button: 'right' });
      break;
    }
    case 'hoverAt': {
      const [sel, fx = 0.5, fy = 0.5] = [].concat(v);
      const box = await page.locator(sel).first().boundingBox();
      await page.mouse.move(box.x + box.width * fx, box.y + box.height * fy, { steps: 5 });
      break;
    }
    case 'wheel': {
      // {"wheel": ["#img", -120, 4]} scrolls the wheel over the element (negative = up / zoom in)
      const [sel, dy = -120, times = 1] = v;
      const box = await page.locator(sel).first().boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      for (let i = 0; i < times; i++) { await page.mouse.wheel(0, dy); await page.waitForTimeout(120); }
      break;
    }
    case 'reload': await page.reload({ waitUntil: until }); break;
    default: throw new Error(`Unknown step "${kind}"`);
  }
}
