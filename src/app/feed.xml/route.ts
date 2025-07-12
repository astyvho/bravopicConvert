import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://bravopicconvert.com' // 실제 도메인으로 변경 필요
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BravoPic Image Converter</title>
    <description>Convert PNG images to WebP or JPG for free, fast, and securely in your browser. No installation required.</description>
    <link>${baseUrl}</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>Free Online Image Converter - BravoPic</title>
      <description>Convert PNG images to WebP or JPG for free, fast, and securely in your browser. Batch upload, bulk conversion, privacy protected.</description>
      <link>${baseUrl}</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="false">${baseUrl}-home</guid>
    </item>
    
    <item>
      <title>How to Use BravoPic Image Converter</title>
      <description>Learn how to convert your images easily with our step-by-step guide.</description>
      <link>${baseUrl}/how-to-use</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="false">${baseUrl}-how-to-use</guid>
    </item>
    
    <item>
      <title>Privacy Policy - BravoPic</title>
      <description>Read our privacy policy to understand how we protect your data.</description>
      <link>${baseUrl}/privacy-policy</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="false">${baseUrl}-privacy</guid>
    </item>
    
    <item>
      <title>Terms of Service - BravoPic</title>
      <description>Read our terms of service for using BravoPic Image Converter.</description>
      <link>${baseUrl}/terms</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid isPermaLink="false">${baseUrl}-terms</guid>
    </item>
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // 1시간 캐시
    },
  })
} 