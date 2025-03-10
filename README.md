# CookieChimp Segment Wrapper

<!-- [![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url] -->


## Install

```bash
npm install @identitysquare/cookiechimp-segment-wrapper
npm install @segment/analytics-next
```

## Usage

```ts
import { withCookieChimpCMP } from '@identitysquare/cookiechimp-segment-wrapper'
import { AnalyticsBrowser } from '@segment/analytics-next'

export const analytics = new AnalyticsBrowser()

withCookieChimpCMP(analytics).load({
  writeKey: '<MY_WRITE_KEY>'
})
```

### Always Load Segment

If Segment is a Required vendor, you can enable it to load in opt-in locations before consent is given while ensuring non-required destinations remain blocked.

```ts
withCookieChimpCMP(analytics, { alwaysLoadSegment: true }).load({
  writeKey: '<MY_WRITE_KEY>'
})
```


[build-img]:https://github.com/IdentitySquare/CookieChimp-Segment-Wrapper/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/IdentitySquare/CookieChimp-Segment-Wrapper/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@identitysquare/cookiechimp-segment-wrapper
[downloads-url]:https://www.npmtrends.com/@identitysquare/cookiechimp-segment-wrapper
[npm-img]:https://img.shields.io/npm/v/CookieChimp-Segment-Wrapper
[npm-url]:https://www.npmjs.com/package/@identitysquare/cookiechimp-segment-wrapper
[issues-img]:https://img.shields.io/github/issues/IdentitySquare/CookieChimp-Segment-Wrapper
[issues-url]:https://github.com/IdentitySquare/CookieChimp-Segment-Wrapper/issues
[codecov-img]:https://codecov.io/gh/IdentitySquare/CookieChimp-Segment-Wrapper/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/IdentitySquare/CookieChimp-Segment-Wrapper
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
