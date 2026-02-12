import { NextResponse } from 'next/server';
import { logRequest, logResponse } from '@/lib/apiLogger';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    logRequest('/api/debug', 'GET', { url: request.url, query });

    const payload = {
      method: 'GET',
      url: request.url,
      query,
      message: 'Debug endpoint. Send POST to echo a body back.',
    };

    logResponse('/api/debug', 'GET', { status: 200, result: payload });
    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    console.error('Debug GET error:', error);
    logResponse('/api/debug', 'GET', { status: 500, error: error.message });
    return NextResponse.json({ success: false, message: 'Internal error', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    logRequest('/api/debug', 'POST', { url: request.url, body });

    const payload = {
      method: 'POST',
      url: request.url,
      body,
      echo: body,
    };

    logResponse('/api/debug', 'POST', { status: 200, result: { body } });
    return NextResponse.json({ success: true, data: payload }, { status: 200 });
  } catch (error) {
    console.error('Debug POST error:', error);
    logResponse('/api/debug', 'POST', { status: 500, error: error.message });
    return NextResponse.json({ success: false, message: 'Internal error', error: error.message }, { status: 500 });
  }
}
