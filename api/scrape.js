export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url || typeof url !== 'string' || !url.startsWith('http')) {
    return res.status(400).json({ ok: false, message: '올바른 상품 URL이 필요합니다.' });
  }

  const decodeHtml = (str = '') =>
    str
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#x2F;/g, '/')
      .replace(/\s+/g, ' ')
      .trim();

  const isBlockedText = (text = '') => {
    const blockedKeywords = [
      '에러페이지',
      '시스템오류',
      '접속이 불가합니다',
      '비정상적인 접근',
      'access denied',
      'robot check',
      'captcha',
      '잠시 후 다시 시도',
    ];
    const lower = text.toLowerCase();
    return blockedKeywords.some((kw) => lower.includes(kw));
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        Referer: 'https://search.naver.com/',
        'Cache-Control': 'no-cache',
      },
    });
    clearTimeout(timer);

    const html = await response.text();

    // 메타 태그 추출 헬퍼 (property/name 순서 무관)
    const getMeta = (attrName) => {
      const patterns = [
        new RegExp(
          `<meta[^>]+(?:property|name)=["']${attrName}["'][^>]+content=["']([^"']+)["']`,
          'i'
        ),
        new RegExp(
          `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${attrName}["']`,
          'i'
        ),
      ];
      for (const re of patterns) {
        const match = html.match(re);
        if (match?.[1]) return decodeHtml(match[1]);
      }
      return '';
    };

    const rawTitle =
      getMeta('og:title') ||
      getMeta('twitter:title') ||
      decodeHtml((html.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || '');

    if (!rawTitle || isBlockedText(rawTitle)) {
      return res.status(200).json({
        ok: false,
        blocked: true,
        message: '쇼핑몰 보안 정책으로 자동 추출이 제한된 링크입니다. 직접 입력해 주세요.',
      });
    }

    // 쇼핑몰 이름 꼬리표 정리
    const cleanTitle = rawTitle
      .replace(
        /\s*[-|:!]\s*(쿠팡|Coupang|네이버\s*쇼핑|네이버\s*스마트스토어|스마트스토어|AliExpress|알리익스프레스|오늘의집|G마켓|11번가).*$/i,
        ''
      )
      .trim();

    let imageUrl = getMeta('og:image') || getMeta('twitter:image') || '';
    if (imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    }

    const rawDesc = getMeta('og:description') || getMeta('description') || '';
    const description = isBlockedText(rawDesc) ? '' : rawDesc;

    // 가격 추출 (OG 가격 -> 스마트스토어 JSON -> 설명 텍스트 순)
    let price = '';
    const ogPrice = getMeta('product:price:amount') || getMeta('og:price:amount');
    if (ogPrice && /^\d+/.test(ogPrice.replace(/,/g, ''))) {
      price = ogPrice.replace(/[^0-9]/g, '');
    }

    if (!price) {
      const jsonPriceMatch = html.match(
        /"(?:discountedSalePrice|salePrice|lowPrice|price)"\s*:\s*"?([1-9][0-9]{2,8})"?/
      );
      if (jsonPriceMatch?.[1]) {
        price = jsonPriceMatch[1];
      }
    }

    if (!price && description) {
      const descPriceMatch = description.match(/([0-9]{1,3}(?:,[0-9]{3})+)\s*원/);
      if (descPriceMatch?.[1]) {
        price = descPriceMatch[1].replace(/,/g, '');
      }
    }

    return res.status(200).json({
      ok: true,
      data: {
        title: cleanTitle,
        image: imageUrl,
        description,
        price,
      },
    });
  } catch (err) {
    return res.status(200).json({
      ok: false,
      message: '페이지 응답 시간이 초과되었거나 차단된 링크입니다.',
    });
  }
}