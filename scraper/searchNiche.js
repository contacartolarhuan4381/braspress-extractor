const puppeteer = require('puppeteer');

async function extractEmails(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    }).catch(() => null);

    if (!response) return '';

    const html = await response.text().catch(() => '');
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return emailMatch ? emailMatch[0] : '';
  } catch {
    return '';
  }
}

async function searchGoogleMaps(niche, region) {
  let browser = null;
  const results = [];
  const maxResults = 10; // Máximo de empresas para extrair

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions'
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Buscar no Google Maps
    const query = `${niche} em ${region}`;
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}/`;

    console.log(`Buscando: ${query}`);
    await page.goto(mapsUrl, { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});

    // Aguardar carregamento dos resultados
    await page.waitForTimeout(3000);

    // Scroll para carregar mais resultados
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => {
        const resultsList = document.querySelector('[role="feed"]');
        if (resultsList) {
          resultsList.scrollTop = resultsList.scrollHeight;
        }
      });
      await page.waitForTimeout(1000);
    }

    // Extrair informações dos estabelecimentos
    const establishments = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('[data-item-id]'));
      return items.slice(0, 10).map(item => {
        const nameEl = item.querySelector('[data-item-label]');
        const ratingEl = item.querySelector('[data-rating]');
        const reviewsEl = item.querySelector('[data-num-reviews]');

        return {
          name: nameEl?.textContent?.trim() || '',
          rating: ratingEl?.textContent?.trim() || '',
          reviews: reviewsEl?.textContent?.trim() || ''
        };
      }).filter(e => e.name);
    });

    // Para cada estabelecimento, tentar encontrar telefone e email
    for (const est of establishments) {
      if (results.length >= maxResults) break;

      try {
        // Clicar no estabelecimento para abrir detalhes
        const nameSelector = `div[data-item-label="${est.name}"]`;
        const element = await page.$(nameSelector).catch(() => null);

        if (element) {
          await element.click().catch(() => {});
          await page.waitForTimeout(2000);

          // Extrair telefone e website do painel
          const details = await page.evaluate(() => {
            const phoneEl = Array.from(document.querySelectorAll('a[href^="tel:"]'))[0];
            const websiteEl = Array.from(document.querySelectorAll('a[href^="http"]')).find(el => 
              el.textContent.includes('www') || el.textContent.includes('.')
            );
            const addressEl = document.querySelector('[data-address]');

            return {
              phone: phoneEl?.textContent?.trim() || '',
              website: websiteEl?.href || '',
              address: addressEl?.textContent?.trim() || ''
            };
          });

          // Tentar extrair email do website
          let email = '';
          if (details.website) {
            email = await extractEmails(details.website);
          }

          results.push({
            nome: est.name,
            telefone: details.phone || 'Não informado',
            email: email || 'Não informado',
            endereco: details.address || 'Não informado',
            avaliacao: est.rating || 'Sem avaliação'
          });
        }
      } catch (error) {
        console.log(`Erro ao processar ${est.name}:`, error.message);
      }
    }

    await browser.close();
    return results;

  } catch (error) {
    console.error('Erro na busca:', error.message);
    if (browser) await browser.close();
    return [];
  }
}

module.exports = { searchGoogleMaps };
